import { BarChart , Bar, XAxis, YAxis, Tooltip, Legend, Label } from 'recharts';

import type { Database } from "../../types/supabase";

interface IProps {
    data: Database["public"]["Tables"]["link_visits"]["Row"][]
    width?: number
    height?: number
}

function Chart(props: IProps) {
    return (
        <BarChart width={props.width || 600} height={props.height || 300} data={props.data} >
			<XAxis dataKey="date" />
			<YAxis />
            <Legend verticalAlign="top" height={48}/>
			<Bar dataKey="total_visits" barSize={30} fill="black"/>
            <Bar dataKey="unique_visits" barSize={30} fill="gray"/>
			<Tooltip cursor={{fill: 'transparent'}}/>
            <Label value="Visits per day" offset={0} position="insideBottom" />
		</BarChart>
    )
}

export {Chart}