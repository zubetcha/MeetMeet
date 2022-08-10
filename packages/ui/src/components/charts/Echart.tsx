import ReactEcharts from 'echarts-for-react';


export const Echart = ({ option }:any) => {

  return (
    <ReactEcharts notMerge={true}  option={option} style={{ height:'100%', width:'100%'}} />
  )
}

