import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import {Data} from './DATA';
export default function RoutineTable() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 5,
    maxColumns: 6,
  });
console.log({Data})
  return (
    <div className=""style={{margin:'auto', height: '80vh', width: 820 }}>
    <div style={{ height: '80vh', width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          {/* <DataGrid  {...data} /> */}
          <DataGrid editMode="row"
            columns={[
                { field: 'id' },
                { field: 'Date', type: 'date',editable: true ,headerName: 'Date',  description:
                'Date at which reading was taken',},
                 { field: 'Bfasting', editable: true  },
                  { field: 'Bpp', editable: true  },
                  { field: 'Lfasting', editable: true  },
                   { field: 'Lpp' , editable: true },
                   { field: 'Dfasting', editable: true  },
                    { field: 'Dpp', editable: true  },
                ]}
                rows={
                    Data
                }
/>
        </div>
      </div>
    </div>
    </div>
  );
}