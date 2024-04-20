export default function Services() {
  return (
    <div>
      <Section1 />
      <Section2 />
    </div>
  );
}

const Section1 = () => (
  <section className="flex flex-col items-center mt-24 overflow-hidden">
    <h1 className=" text-cl-darker text-5xl xl:text-6xl font-orelega-one text-center ">
      Distribution Nationale 24/7
    </h1>
    <p className="w-[90%] md:w-[70%] text-center text-cl-gray my-7">
      Chez  Grain du sud, nous comprenons l'importance de la fiabilité et de la
      rapidité dans la livraison de produits essentiels à l'élevage. C'est
      pourquoi nous offrons un service de distribution disponible 24 heures sur
      24, 7 jours sur 7, dans toute la Tunisie. Nos solutions logistiques
      avancées et notre flotte de véhicules modernes garantissent que vos
      commandes de nutrition, de poussins, ou de poulets prêts à cuisiner sont
      livrées rapidement et en toute sécurité, où que vous soyez dans le pays.
      Faites confiance à  Grain du Sud pour une distribution efficace et sans
      tracas, assurant ainsi la continuité de vos activités avicoles sans
      interruption.
    </p>
    <img src="/images/services-s1.png" alt="" />
  </section>
);

const Section2 = () => (
  <section className=" my-20 px-10">
    <h1 className=" text-cl-darker font-orelega-one text-5xl xl:text-6xl">
      Vaccination des Poussins
    </h1>
    <p className=" text-cl-gray w-[90%] max-w-[500px] ml-7 my-9">
      La santé de votre élevage nous tient à cœur. C'est pourquoi nous proposons
      un service de vaccination complet pour tous l es poussins vendus. Nos
      protocoles de vaccination sont conçus pour protéger efficacement vos
      volailles contre l es maladies courantes, assurant ainsi leur bien-être et
      une croissance saine dès le début.
    </p>
    <div>
      <img
        src="/images/services-s2.png"
        alt="img"
        className=" w-96 ml-auto mr-9 mt-4"
      />
    </div>
  </section>
);
