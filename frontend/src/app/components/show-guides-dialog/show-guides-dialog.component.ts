import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GuideService } from 'src/app/service/guide/guide.service';
import { Store } from '@ngrx/store';
import * as userSelector from '../../store/user/user.selector';
import { UserService } from 'src/app/service/user/user.service';
import * as jspdf from 'jspdf';
import 'jspdf-autotable';

declare var Razorpay: any;
@Component({
  selector: 'app-show-guides-dialog',
  templateUrl: './show-guides-dialog.component.html',
  styleUrls: ['./show-guides-dialog.component.css'],
})
export class ShowGuidesDialogComponent {
  itenary: any;
  date!: Date;
  guideList: any;
  paymentId!: string;
  customerName!: any
  currentDate = new Date()

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ShowGuidesDialogComponent>,
    private guideService: GuideService,
    private store: Store,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.itenary = this.data.itenary;
    this.guideList = this.data.guideList;
    this.date = new Date(this.data.date);
    console.log(this.itenary);
    this.store.select(userSelector.selectUserState).subscribe((response) => {
      this.customerName = response.user?.userName
    })
  }

  hireGuide(guideId: string) {
    this.store.select(userSelector.selectUserState).subscribe((response) => {
      const userId = response.user?.id;
      const itenaryId = this.itenary._id;
      const jobData = {
        date: this.itenary.date,
        customerId: userId,
        placesId: this.itenary.placesId,
      };
      this.guideService.saveJob(jobData, guideId).subscribe((response) => {
        console.log(response);
        this.userService
          .addGuideToItenary(itenaryId, userId, guideId)
          .subscribe((response) => {
            console.log(response);
          });
        this.dialogRef.close();
      });
    });
  }

  intiatePayment(guideId: string) {
    const paymentData = { amount: 100000 };
    this.guideService.guidePayment(paymentData).subscribe((response) => {
      this.paymentId = response.id;
      this.payWithRazorpay(response, guideId);
    });
  }

  payWithRazorpay(orderData: any, guideId: string) {
    const options = {
      key: orderData.key_id,
      amount: orderData.amount,
      currency: 'INR',
      name: 'ExploreEase',
      description: 'Advance payment for guide from ExploreEase',
      order_id: orderData.id,
      handler: (response: any) => {
        console.log('suucess - ',response);
        this.generatePDF(guideId)
        this.hireGuide(guideId)
      },
      prefill: {
        name: 'Test User',
        email: 'test@example.com',
      },
      theme: {
        color: '#3399cc',
      },
    };
    const rzp = new Razorpay(options);
    rzp.open();
  }

  generatePDF(guideId: string) {
    let guideName
    this.guideService.getGuideById(guideId).subscribe((response) => {
      guideName = response.guideName
    })
    
    const doc = new jspdf.jsPDF();
    // Set document properties (optional)
    doc.setProperties({
      title: 'Guide Payment Invoice',
      subject: 'ExploreEase Payment Invoice',
      author: 'ExploreEase',
    });
  
    // Add organization name and heading
    doc.setFontSize(18);
    doc.text('ExploreEase', 10, 10);
    doc.setFontSize(16);
    doc.text('Guide Payment Invoice', 20, 20);
  
    // Define table data
    const tableData = [
      ['Date', 'User Name', 'Trip Date', 'Amount'],
      [this.currentDate, this.customerName, this.date,  'Rs100'],
      // Add more rows here
    ];
  
    // Create table with jspdf-autotable
    (doc as any).autoTable({
      startY: 30,
      head: [tableData[0]], // Table header
      body: tableData.slice(1), // Table body excluding header
    });
  
    // Calculate the position of the text below the table
    const startY = 30; // startY used for the table
    const tableHeight = (doc as any).autoTable.previous.finalY - startY; // Calculate the height of the table
    const fontSize = 10; // Font size used for the "Digitally Signed" text
    const textPositionY = startY + tableHeight + fontSize + 10; // Calculate the y-coordinate for the text
  
    // Add "Digitally Signed" text
    doc.setFontSize(fontSize);
    doc.text('Digitally Signed', 10, textPositionY);
  
    // Save the PDF
    doc.save('Guide_Payment_Invoice.pdf');
  }
}



