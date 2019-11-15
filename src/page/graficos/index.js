import React from 'react';
import api from '../../services/api';
import {Bar} from 'react-chartjs-2';

var setorList = []
var membros = []
export default function Grafico() {


  async function resposta() {
    const response = await api.get('/setor/');

    if(!response) return
      
    const setor = response.data.map((membro, index) => {
      setorList[index] = membro.name
      membros[index] = membro.membros
      return membro.name
    })
    
    return setor;
  }
   resposta()

  var data = {
    labels: setorList,
    datasets: [
      {
        label: 'Quantidades de membros por setor',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: membros
      }
    ]
  };

  resposta();
  return(
      <>
      <div>
        <h2>Setores</h2>
        <Bar
          data={data}
          width={400}
          height={300}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
      </>
    )
}