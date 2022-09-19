

export interface Notice {
  id: number;
  data: {
    id: number;
    title: string;
    body: string;
    createdAt: string;
  }
}
export type NoticeListState = Notice[]; 

export interface NoticeListStatsState {
  totalNum: number;
  lastEventId: number | undefined;
}