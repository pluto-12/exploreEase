export interface GuideData {
  guide: Guide | null;
}

export interface Guide {
  id: string;
  guideEmail: string;
  guideName: string;
}
