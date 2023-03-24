import { useMemo } from 'react';
import { BarChart , Bar, XAxis, YAxis, Tooltip } from 'recharts';

import type { Database } from "../../types/supabase";

interface IProps {
    data: Database["public"]["Tables"]["link_visits"]["Row"][]
}

function Chart(props: IProps) {
    return (
        <BarChart width={600} height={300} data={props.data} >
			<XAxis dataKey="date" />
			<YAxis />
			<Bar dataKey="total_visits" barSize={30} fill="black"/>
            <Bar dataKey="unique_visits" barSize={30} fill="gray"/>
			<Tooltip cursor={{fill: 'transparent'}}/>
		</BarChart>
    )
}

export {Chart}