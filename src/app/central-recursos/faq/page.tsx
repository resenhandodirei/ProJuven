"use client";

import React, { useState } from "react";
import "@/styles/globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface Question {
  question: string;
  answer: string;
}

interface Topic {
  title: string;
  questions: Question[];
}

const topics: Topic[] = [
  {
    title: "Conceitos Básicos",
    questions: [
      {
        question: "O que é a apresentação?",
        answer: `A "audiência de apresentação" para menores que cometeram um ato infracional é o primeiro ato judicial no processo, onde o juiz ouve o adolescente e seus responsáveis para avaliar a situação e decidir sobre a concessão da remissão (extinção do processo) ou a necessidade de uma audiência de continuação para aprofundar a análise e ouvir testemunhas, garantindo ao menor o direito à defesa, conforme o Estatuto da Criança e do Adolescente (ECA).`,
      },
      {
        question: "O que é apresentar?",
        answer: `"Apresentar um menor infrator" significa conduzi-lo à autoridade competente, que, após a apreensão pela autoridade policial, o encaminhará ao Ministério Público para avaliação do caso e encaminhamento da representação ao juiz ou arquivamento, se for o caso. É assegurado ao adolescente o direito de não ser submetido a tratamento vexatório, ser informado dos seus direitos, ter comunicação imediata com a família e o juiz, e o direito a um advogado.`,
      },
      {
        question: "O que é o representado?",
        answer: `É o adolescente a quem se atribui a prática de um ato infracional (conduta análoga a crime ou contravenção penal). Ele não é chamado de réu (como no processo penal do adulto), mas sim representado, pois contra ele foi ajuizada uma representação pelo Ministério Público.`,
      },
      {
        question: "O que é representar?",
        answer: `É o ato processual do Ministério Público de oferecer ao juiz uma peça escrita (a representação) para que seja apurado o ato infracional. No adulto, seria o equivalente a denunciar; no adolescente, é representar.`,
      },
      {
        question: "O que é a representação?",
        answer: `É a peça inicial do procedimento para apuração de ato infracional atribuída a adolescente. Exclusivamente proposta pelo Ministério Público (art. 180 do ECA). Nela, o MP narra os fatos e pede a aplicação de medida socioeducativa adequada.`,
      },
    ],
  },
  {
    title: "Medidas e Procedimentos Provisórios",
    questions: [
      {
        question: "O que é medida provisória?",
        answer: `É uma decisão temporária aplicada pelo juiz da Infância durante a investigação ou tramitação do processo, antes da sentença definitiva. Serve para garantir o andamento do processo e a proteção da sociedade ou do próprio adolescente.`,
      },
      {
        question: "Qual o prazo máximo de medida provisória?",
        answer: `O prazo máximo de medida provisória é de 45 dias.`,
      },
      {
        question: "O que é a remissão?",
        answer: `É uma forma de extinção ou suspensão do processo, funcionando como um “perdão judicial” para o adolescente. Pode ser concedida pelo Ministério Público (antes do processo) ou pelo Juiz (durante o processo). Pode vir acompanhada ou não de medida socioeducativa.`,
      },
      {
        question: "Como é feita a remissão?",
        answer: `Na fase pré-processual: O Ministério Público, ao analisar o caso, pode conceder remissão e não ajuizar a representação (art. 126, ECA). Ex.: advertência verbal ou obrigação de reparar o dano.\nNa fase processual: O Juiz, de ofício ou por requerimento do MP/Defesa, pode conceder a remissão judicial, com ou sem aplicação de medida socioeducativa (art. 127, ECA). Pode suspender ou extinguir o processo.`,
      },
      {
        question: "Em caso de descumprimento das medidas, o que pode ser feita?",
        answer: `Internação sanção de 90 dias.`,
      },
    ],
  },
  {
    title: "Audiências",
    questions: [
      {
        question: "O que é a audiência de instrução?",
        answer: `É a audiência em que o juiz colhe as provas no processo contra o adolescente. Nela:  
- O adolescente (representado) é ouvido, junto com seus responsáveis.  
- São ouvidas testemunhas de acusação e de defesa.  
- Pode haver esclarecimentos de peritos, vítimas ou outras pessoas envolvidas.  
Após a instrução, abre-se espaço para alegações finais e, em alguns casos, já pode ocorrer a audiência de continuação para julgamento (sentença). Equivale, no processo penal adulto, à audiência de instrução e julgamento.`,
      },
      {
        question: "O que acontece se não for julgado durante o tempo de medida provisória?",
        answer: `A medida provisória mais comum é a internação provisória (art. 108 do ECA). Ela tem prazo máximo de 45 dias. Se o processo não for julgado dentro desse período, o juiz é obrigado a liberar o adolescente da internação provisória. O processo pode continuar, mas sem restrição de liberdade provisória. Geralmente os juízes julgam dentro desse prazo e o atendido sai da provisória direto para o cumprimento da sentença.`,
      },
      {
        question: "O que é a audiência admonitária?",
        answer: `É a audiência em que o juiz adverte formalmente o adolescente sobre as consequências do descumprimento da medida socioeducativa aplicada. Acontece principalmente quando a medida é liberdade assistida ou prestação de serviços à comunidade. Além disso, é na audiência que será admitido o jovem na medida. Nessa ocasião, é definido em qual CRAS ele ficará vinculado e ele assina os termos. Somente a partir dessa audiência o adolescente passa a estar incluído na medida. Portanto, se o jovem cometer outro ato infracional antes dela, não haverá caracterização de quebra da LA, por exemplo.`,
      },
      {
        question: "O que é a audiência concentrada?",
        answer: `A Audiência Concentrada é uma reunião solene realizada no âmbito da Vara da Infância e Juventude ou do sistema socioeducativo, onde todos os atores envolvidos na situação de uma criança, adolescente ou jovem (juiz, promotor, defensor público, equipes técnicas, Conselho Tutelar, e secretarias municipais) se encontram para reavaliar a situação jurídica e psicossocial. O objetivo principal é garantir o melhor interesse da criança e do adolescente, promovendo a reintegração familiar, a colocação em família substituta ou o acompanhamento da medida socioeducativa de forma mais eficiente e ágil.`,
      },
    ],
  },
  {
    title: "Procedimento do Adolescente Infrator",
    questions: [
      {
        question: "Como funciona o procedimento?",
        answer: `O procedimento do adolescente infrator, regido pelo Estatuto da Criança e do Adolescente (ECA), inicia-se com o encaminhamento à delegacia, seguido de oitiva na presença de um advogado e responsáveis, sendo que o Ministério Público avaliará a situação para arquivar, conceder remissão ou representar ao juiz para aplicação de medida socioeducativa. A participação da família e do advogado – particular ou defensor público – é obrigatória desde o início para garantir os direitos do adolescente.`,
      },
      {
        question: "Quais os tipos de processo de ato infracional?",
        answer: `Processo de conhecimento e de execução.`,
      },
      {
        question: "Qual tipo de processo que o Nuaja lida?",
        answer: `O Nuaja lida com processos de execução, que estão na 5ª Vara. Mas, eventualmente, nos atendimentos remotos podemos fazer análises processuais de processos que estão em outras varas.`,
      },
    ],
  },
  {
    title: "Medidas Socioeducativas",
    questions: [
      {
        question: "Quais as medidas socioeducativas?",
        answer: `Advertência, Obrigação de reparar o dano, Prestação de serviços à comunidade (PSC), Liberdade assistida (LA), Inserção em regime de semiliberdade, Internação em estabelecimento educacional, Qualquer uma das anteriores, cumulada com tratamento de dependência.`,
      },
      {
        question: "Qual é o tempo de liberdade assistida?",
        answer: `O prazo mínimo é de 6 meses (art. 118, §2º, ECA). Pode ser prorrogada pelo juiz se necessário, considerando relatório da equipe técnica.`,
      },
      {
        question: "Qual é o prazo mínimo para a internação?",
        answer: `Não existe prazo mínimo definido em lei. A regra é que deve durar apenas o tempo necessário à socioeducação.`,
      },
      {
        question: "Qual é o prazo máximo para a internação?",
        answer: `3 anos (art. 121, §3º, ECA). Com reavaliações a cada 6 meses. Liberação compulsória aos 21 anos.`,
      },
    ],
  },
  {
    title: "PIA – Plano Individual de Atendimento",
    questions: [
      {
        question: "O que é o PIA?",
        answer: `É o plano individual de atendimento. É o documento que organiza o cumprimento da medida socioeducativa do adolescente. Nele constam objetivos, prazos, atividades escolares/profissionais e acompanhamento psicossocial. Funciona como um “plano de execução” da medida.`,
      },
      {
        question: "De quanto em quanto tempo é feito o PIA?",
        answer: `Deve ser avaliado a cada 6 meses (art. 42, §1º, Lei 12.594/2012 – SINASE).`,
      },
    ],
  },
  {
    title: "Procedimento de Execução",
    questions: [
      {
        question: "Quais as etapas do procedimento de execução?",
        answer: `1. Sentença que aplica a medida.  
2. Elaboração do PIA.  
3. Execução da medida (acompanhamento pelo juiz, equipe técnica e Defensoria).  
4. Relatórios periódicos (a cada 6 meses).  
5. Revisão judicial da medida.  
6. Extinção ou substituição da medida.`,
      },
    ],
  },
  {
    title: "Centros Socioeducativos e Programas",
    questions: [
      {
        question: "O que é o PPRO e o PPCAM?",
        answer: `PPCAM é o programa federal (previsto em lei e política nacional). PPRO é denominação estadual ou regional, vinculado ao mesmo tipo de proteção.`,
      },
      {
        question: "Qual é a diferença entre o PPRO e o PPCAM?",
        answer: `O PPRO deve durar no máximo 30 dias e é feito para situações emergenciais em que o jovem é retirado da localidade que tem a ameaça.`,
      },
    ],
  },
  {
    title: "Sistemas e Ferramentas",
    questions: [
      {
        question: "O que é o SINASE?",
        answer: `Sistema Nacional de Atendimento Socioeducativo (Lei 12.594/2012). Regula a execução das medidas socioeducativas.`,
      },
      {
        question: "O que é o e-SAJ?",
        answer: `Sistema de processo eletrônico usado em alguns tribunais (ex.: TJCE). Usado para peticionar, acompanhar processos, consultar prazos. Requer certificado digital para login.`,
      },
      {
        question: "O que é o PJe?",
        answer: `Processo Judicial Eletrônico (CNJ). Também permite peticionar e acompanhar processos. Interface diferente do e-SAJ, mas mesma lógica: login com certificado digital.`,
      },
    ],
  },
  {
    title: "Outros Procedimentos",
    questions: [
      {
        question: "O que é o mandado de busca e apreensão?",
        answer: `Ordem judicial para localizar e apreender adolescente que descumpre medida ou está foragido.`,
      },
      {
        question: "O que é a apreensão?",
        answer: `É a condução do adolescente pela polícia ou por ordem judicial para apresentação à autoridade competente (não se chama "prisão").`,
      },
      {
        question: "O que fazer quando o atendido fica impossibilitado de cumprir medida socioeducativa de semiliberdade?",
        answer: `Comunicar imediatamente ao juiz e à Defensoria. Pedir substituição da medida (ex.: para liberdade assistida). Apresentar justificativa médica, social ou de segurança.`,
      },
    ],
  },
];

const FAQProJuven: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (question: string) => {
    setExpanded(expanded === question ? null : question);
  };

  return (
    <>
    <Navbar />
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">FAQ ProJuven</h1>
      {topics.map((topic) => (
        <section key={topic.title} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{topic.title}</h2>
          <div className="space-y-2">
            {topic.questions.map((q) => (
              <div key={q.question} className="border rounded-md overflow-hidden shadow-sm">
                <button
                  className="w-full text-left px-4 py-2 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium"
                  onClick={() => toggle(q.question)}
                >
                  {q.question}
                </button>
                {expanded === q.question && (
                  <div className="px-4 py-2 bg-white text-gray-800 whitespace-pre-line">
                    {q.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
    <Footer />
    </>
  );
};

export default FAQProJuven;
