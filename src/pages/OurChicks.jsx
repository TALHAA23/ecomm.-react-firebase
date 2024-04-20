export default function OurChicks() {
  return (
    <div>
      <Section1 />
      <Section2 />
    </div>
  );
}

const Section1 = () => (
  <section className="flex flex-col items-center mt-24 overflow-hidden">
    <h1 className="w-[90%] max-w-[700px] text-cl-darker text-4xl xl:text-5xl font-orelega-one text-center ">
      Vente de Poussins de Chair
    </h1>
    <p className="relative w-[90%] md:w-[60%] text-center text-cl-gray my-7">
      Chez Grain du sud, nous sommes fiers de proposer deux souches de poussins
      de chair de haute qualité, spécialement sélectionnées pour leur
      performance et leur robustesse. Nos poussins répondent aux exigences des
      éleveurs modernes, offrant une croissance rapide et une bonne santé
      globale.
      <img
        src="/icons/quotes-svgrepo-com.svg"
        alt="quote"
        className=" absolute -top-1/2 scale-50 -left-7"
      />
      <img
        src="/icons/quotes-svgrepo-com.svg"
        alt="quote"
        className=" absolute -bottom-1/2 scale-50 -right-7 rotate-180"
      />
    </p>
    <img src="/images/outChicks-s1.png" alt="img" />
  </section>
);

const Section2 = () => (
  <section className="relative mb-20 py-16  px-12 flex justify-center">
    <div className="  translate-x-16 bg-light flex flex-col justify-center w-1/2 aspect-square rounded-full p-10 xl:p-16">
      <h1 className=" text-cl-darker font-orelega-one text-2xl xl:text-6xl text-center mb-5 xl:mb-14">
        Souche F15
      </h1>
      <p className="text-sm lg:text-base">
        La souche F15 est reconnue pour sa croissance rapide et son efficacité
        alimentaire. Ces poussins se distinguent par leur capacité à atteindre
        rapidement un poids idéal, ce qui en fait un choix excellent pour les
        éleveurs qui cherchent à optimiser leur retour sur investissement.
        Adaptés aux climats variés, les poussins F15 sont robustes et
        résilients, offrant une performance constante.
      </p>
    </div>
    {/*  */}
    <div className="translate-y-28 bg-light flex flex-col justify-center w-1/2 aspect-square rounded-full p-10 xl:p-16">
      <h1 className=" text-cl-darker font-orelega-one text-2xl xl:text-6xl text-center mb-5 xl:mb-14">
        Souche Arbor
      </h1>
      <p className="text-sm lg:text-base">
        La souche Arbor est appréciée pour sa grande adaptabilité et sa
        résistance aux conditions d'élevage diverses. Ce type de poussin est
        idéal pour les éleveurs qui opèrent dans des environnements
        potentiellement difficiles, car ils maintiennent une bonne santé et une
        croissance stable même dans des conditions moins optimales. Arbor est
        également connu pour sa bonne qualité de viande, ce qui en fait une
        option privilégiée pour les marchés exigeant une viande tendre et
        juteuse.
      </p>
    </div>
  </section>
);
