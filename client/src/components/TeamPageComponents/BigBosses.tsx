import React, { useEffect, useState } from 'react';
import data from "./boss.json"
import { Card, CardContent, Typography, Button } from '@mui/material';
import './BigBosses.css'
import boss1 from "../../images/boss1.jpg"
import boss2 from "../../images/boss2.jpg"
import boss3 from "../../images/boss3.jpg"
import boss4 from "../../images/boss4.jpg"
import boss5 from "../../images/boss5.jpg"
import boss6 from "../../images/boss6.jpg"
import boss7 from "../../images/boss7.png"

interface BossType{
    id:number;
    name:string;
    role:string;
    image:string;
}


const imageMapping: Record<string, string> = {
    boss1: boss1,
    boss2: boss2,
    boss3:boss3,
    boss4:boss4,
    boss5:boss5,
    boss6:boss6,
    boss7:boss7,
};

const BigBosses = () => {
    const [boss, setBoss] = useState<BossType[]>([]);

    useEffect(() => {
        setBoss(data.boss);
    }, []);


    return (
        <div className="boss-container">

            <h1 style={{color:"white",fontSize:"30px"}}>Представители клуба</h1>

            <div className="boss-content">
          {boss.map((item) => (
            <Card key={item.id} className="boss-card">
              <img src={imageMapping[item.image]} alt={item.name} className="boss-image" />
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2">{item.role}</Typography>

              </CardContent>
            </Card>
          ))}
        </div>
  </div>

    );
};

export default BigBosses;