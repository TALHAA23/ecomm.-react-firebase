import Line from "../components/Line";

export default function OurNutrition() {
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
      Des Nutritions de Haute Qualité pour une Performance Optimale
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
    <img src="/images/outnutrations-s1.png" alt="img" />
  </section>
);

const Section2 = () => (
  <section className="relative mb-20 py-16  px-12 flex justify-center">
    <div className="  translate-x-16 bg-light flex flex-col justify-center w-1/2 aspect-square rounded-full p-10 xl:p-16">
      <h1 className=" text-cl-darker font-orelega-one text-2xl xl:text-6xl text-center mb-5 xl:mb-14">
        Nutrition pour poulet pondeuse
      </h1>
      <p className="text-sm lg:text-base">
        Optimisez la productivité de vos pondeuses avec notre gamme spécialement
        formulée pour améliorer la santé globale et maximiser la qualité des
        œufs. Nos produits sont enrichis avec des vitamines et minéraux
        essentiels pour soutenir le bien-être des pondeuses à chaque étape de
        leur vie
      </p>
    </div>
    {/*  */}
    <div className="translate-y-28 bg-light flex flex-col justify-center w-1/2 aspect-square rounded-full p-10 xl:p-16">
      <h1 className=" text-cl-darker font-orelega-one text-2xl xl:text-6xl text-center mb-5 xl:mb-14">
        Nutrition pour poulet de chair
      </h1>
      <p className="text-sm lg:text-base">
        Élevez des poulets de chair plus sains et plus robustes avec notre
        nutrition spécialisée, conçue pour accélérer la croissance, améliorer
        l'efficacité alimentaire et garantir une viande de qualité supérieure
      </p>
    </div>
  </section>
);
