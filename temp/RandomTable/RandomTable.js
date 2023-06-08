import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import {RData} from './DATA';
export default function RandomTable() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 5,
    maxColumns: 4,
  });
  return (
    <div className=""style={{margin:'auto', height: '80vh', width: '540px' }}>
    <div style={{ height: '80vh', width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          {/* <DataGrid  {...data} /> */}
         
          <DataGrid editMode="row"
            columns={[
                { field: 'id',width:60 },
                { field: 'Date',width:150, type: 'date',editable: true ,headerName: 'Date',  description:
                'Date at which reading was taken',},
                { field: 'Time',width:150, type: 'time',editable: true ,headerName: 'Time',  description:
                'Time at which reading was taken',},
                 { field: 'Readings', width:170, editable: true  }
                ]}
                rows={
                    RData
                }
/>
        </div>
      </div>
    </div>
    </div>
  );
}