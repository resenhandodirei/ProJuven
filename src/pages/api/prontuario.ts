import { NextApiRequest, NextApiResponse } from 'next';

// Simulação de banco em memória (substitua por Prisma depois)
let prontuarios: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
  const {
    nomeJovem,
    numeroProcesso,
    faseProcessual,
    atoInfracional,
    idade,
    raca,
    genero,
    estadoSaudeMental,
    centroSocioeducativo,
    medidaSocioeducativa,
    dataApreensao,
    violenciaInstitucional,
    historico
  } = req.body;

  if (!nomeJovem || !numeroProcesso || !faseProcessual) {
    return res.status(400).json({ message: 'Preencha os campos obrigatórios.' });
  }

  const novoProntuario = { id: prontuarios.length + 1, ...req.body };
  prontuarios.push(novoProntuario);

        return res.status(201).json({ 
            message: 'Prontuário criado com sucesso!', 
            prontuario: novoProntuario 
        });

        return res.status(201).json({
            message: 'Prontuário criado com sucesso!',
            prontuario: novoProntuario,
        });


        
}
if(req.method === 'GET') {
            return res.status(200).json({
                total: prontuarios.length,
                prontuarios,
        });
    return res.status(405).json({ message: 'Método não permitido' });
}
}
