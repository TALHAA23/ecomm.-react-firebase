import Line from "../components/Line";

export default function Welcome() {
  return (
    <div>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
    </div>
  );
}

const Section1 = () => (
  <section className=" bg-lighter flex gap-0">
    <div className="flex flex-col items-center pt-24 pb-10">
      <h1 className=" font-orelega-one text-cl-darker text-5xl xl:text-6xl flex flex-col text-center">
        <span>Bienvenue chez Grain du Sud</span>
        <span className=" text-3xl xl:text-4xl">
          Leader de l'innovation dans l'aviculture en Tunisie
        </span>
      </h1>
      <Line lineWidth="w-[70%]" margin="m-14" />
      <p className="relative w-[90%] md:w-[70%] text-cl-gray text-center">
        Depuis sa fondation en Tunisie, Grain du sud du sud s'est imposée comme
        un acteu r incontournable dans le secteur avicole tunisien. Spécialisés
        dans la fourniture de solutions de nutrition de haute qualité pour les
        poulets de chair et les poules pondeuses, nous sommes également reconnus
        pour notre expertise dans l'élevage et la distribution de volailles
        saines et robustes, ainsique pour nos services de vaccination. Notre
        mission est de soutenir les éleveurs à travers la Tunisie avec des
        produits et services qui améliorent la productivité et la rentabilité de
        leurs exploitations avicoles.
        <img
          src="/icons/quotes-svgrepo-com.svg"
          alt="quote"
          className="absolute rotate-180 right-0 -translate-y-2"
        />
      </p>
      <Line lineWidth="w-[70%]" margin="m-14" />
    </div>
    <img
      src="/images/welcome-s1.png"
      alt="img"
      className="w-[30%] aspect-[16/9] object-cover"
    />
  </section>
);

const Section2 = () => (
  <section className="relative flex flex-col items-center mt-16 overflow-hidden">
    <h1 className=" text-cl-darker text-5xl xl:text-6xl font-orelega-one text-center ">
      Un Secteur Avicole Dynamique en Tunisie
    </h1>
    <p className="w-[90%] md:w-[70%] text-center text-cl-gray my-7">
      L'aviculture est l'un des piliers de l'agriculture tunisienne. Elle joue
      un rôle crucial non seulement dans la sécurité alimentaire du pays mais
      également comme source de revenu pour des milliers de familles. Avec une
      demande croissante en produits de volaille, due à une prise de conscience
      accrue des bienfaits des protéines de poulet et à l'augmentation de la
      population, le secteur avicole tunisien a connu une croissance rapide.
      Cette dynamique est soutenue par des améliorations continues en termes de
      techniques d'élevage, de standards de santé animale et de méthodes de
      nutrition.
    </p>
    <img src="/images/welcome-s2.png" alt="" />
    <div className=" absolute  w-52 -right-10 -top-10 shadow-lg aspect-square rounded-full bg-light"></div>
  </section>
);

const Section3 = () => (
  <section className=" my-28">
    <div className="relative w-[80%] max-w-[1250px] rounded-lg bg-lighter mx-auto p-5">
      <h1 className="text-5xl xl:text-6xl font-orelega-one text-cl-darker -translate-y-12 text-center w-[60%]">
        Grain du sud au Cœur de l'Innovation
      </h1>
      <Line lineWidth="w-[70%]" />
      <p className=" w-[70%] text-cl-gray ">
        Chez Grain du sud, nous comprenons les défis auxquels les éleveurs sont
        confrontés quotidiennement. C'est pourquoi nous nous engageons à fournir
        des produits de la plus haute qualité, conçus scientifiquement pour
        répondre aux besoins spécifiques des volailles à différents stades de
        leur développement. Nos installations de pointe et notre équipe
        d'experts dédiée permettent une innovation constante et l'adaptation de
        nos produits aux conditions locales, assurant ainsi la meilleure
        performance possible pour nos clients.
      </p>
      <img
        src="/images/welcome-s3.png"
        alt="img"
        className=" absolute w-72 xl:w-80 aspect-square -top-24 -right-10"
      />
    </div>
  </section>
);

const Section4 = () => (
  <section>
    <h1 className="pl-12 text-cl-darker font-orelega-one text-5xl xl:text-6xl w-full max-w-[960px]">
      Un Engagement pour la Qualité et la Durabilité
    </h1>
    <div className="relative h-[480px]">
      <div className=" absolute w-[70%] min-w-[600px] h-[400px] right-0 rounded-l-full">
        <img
          src="/images/welcome-s4.png"
          alt="img"
          className=" w-full object-cover"
        />
      </div>
      <div className=" absolute w-1/2 min-w-[500px] h-[250px] left-0 bg-darker translate-y-[90%] rounded-r-full flex items-center justify-center">
        <p className="w-[80%]">
          Nous adoptons une approche durable et responsable de l'aviculture,
          avec un engagement ferme envers les pratiques éthiques et
          environnementales. Cela comprend l'utilisation prudente des
          ressources, le respect des normes de bien-être animal et une
          collaboration étroite avec les communautés locales pour soutenir leur
          développement économique et social.
        </p>
      </div>
    </div>
  </section>
);

const Section5 = () => (
  <section className=" my-28">
    <div className="relative w-[90%] max-w-[800px] bg-lighter px-10 text-lg  pb-4 mx-auto">
      <div className=" absolute bg-light p-2 rounded-lg  w-[70%] min-w-[500px] -top-7 -left-7">
        <h1 className="font-orelega-one text-4xl text-cl-darker">
          Rejoignez-nous dans notre mission pour une aviculture tunisienne
          prospère
        </h1>
      </div>
      <p className=" text-cl-gray pt-32">
        Découvrez nos produits, services et engagements sur ce site et voyez
        comment Grain du sud peut vous aider à réaliser le potentiel plein de
        votre entreprise avicole. Restez informé en lisant notre blog et
        participez à la conversation sur nos réseaux sociaux. Chez  Grain du
        sud, nous cultivons l'excellence pour nourrir demain.
      </p>
    </div>
  </section>
);
