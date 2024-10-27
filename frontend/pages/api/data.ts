    // Dummy data 
import type { NextApiRequest, NextApiResponse } from 'next';

interface DataPoint {
    label: string;
    value: number;
}

const data: DataPoint[] = [
    { label: 'January', value: 65 },
    { label: 'February', value: 59 },
    { label: 'March', value: 80 },
    { label: 'April', value: 81 },
    { label: 'May', value: 56 },
    { label: 'June', value: 55 },
    { label: 'July', value: 40 },
];

export default function handler(req: NextApiRequest, res: NextApiResponse<DataPoint[]>) {
    res.status(200).json(data);
}
