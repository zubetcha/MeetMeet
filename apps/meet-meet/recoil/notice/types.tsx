

export interface Notice {
  id: number;
  title: string;
  body: string;
  createdAt: string;
}
export interface NoticeDataState {
  noticeList: Array<Notice>;
  lastEventId: string;
}; 

export interface NoticeListStatsState {
  totalNum: number;
}