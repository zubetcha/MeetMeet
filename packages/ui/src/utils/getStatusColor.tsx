export const getEquipmentStatusColor = (status: string): string => {
  interface StatusColorType {
    [key: string]: string;
  }
  const statusColor: StatusColorType = {
    active: "#116D38",
    idle: "#FFC600",
    off: "#F25341",
    exception: "#A2A2A3",
  };
  return statusColor[status];
};


export const color =[
  '#116D38',
  '#FFC600',
  '#F25341',
  '#00D9AF',
  '#A0C5AF',
  '#FFE58D',
  '#FF9F8B',
  '#80ECD7',
]