import Line from "../components/Line";
export default function OurChickens() {
  return (
    <div>
      <Section1 />
      <Section2 />
    </div>
  );
}

const Section1 = () => (
  <section className=" bg-lighter flex gap-0">
    <div className="flex flex-col items-center pt-24 pb-10">
      <h1 className=" font-orelega-one text-cl-darker text-5xl xl:text-6xl flex flex-col text-center">
        Des Poulets de Qualité pour Votre Exploitation
      </h1>
      <Line lineWidth="w-[70%]" margin="m-14" />
      <p className="relative w-[90%] md:w-[70%] text-cl-gray text-center">
        Chez  Grain du Sud, nous sommes fiers de proposer des poulets de chair
        élevés dans les meilleures conditions et prêts à être élevés à partir de
        l'âge de 40 à 45 jours. Cette offre est spécialement conçue pour les
        éleveurs professionnels qui recherchent des volailles de haute qualité,
        prêtes à intégrer une production intensive ou à petite échelle.
        <img
          src="/icons/quotes-svgrepo-com.svg"
          alt="quote"
          className="absolute rotate-180 right-0 -translate-y-2"
        />
      </p>
      <Line lineWidth="w-[70%]" margin="m-14" />
    </div>
    <img
      src="/images/ourchickens-s1.png"
      alt="img"
      className="w-[30%] aspect-[16/9] object-cover"
    />
  </section>
);

const Section2 = () => (
  <section className="relative my-32 px-28 flex flex-col gap-16">
    <div className="relative bg-lighter w-[500px]">
      <h1 className=" absolute  -left-10 -top-10 text-cl-darker font-orelega-one text-2xl bg-light rounded-lg px-3 py-5">
        Des Volumes Adaptés à Vos Besoins
      </h1>
      <p className="pt-12 px-4">
        Nous comprenons les exigences des grandes exploitations et des
        distributeurs, c'est pourquoi nous offrons ces poulets en grandes
        quantités, assurant ainsi la capacité de répondre aux besoins de clients
        de tout volume. Nos poulets sont soigneusement sélectionnés pour leur
        santé et leur vigueur, garantissant une croissance optimale et une
        efficacité maximale pour votre exploitation
      </p>
    </div>
    {/*  */}
    <div className="relative bg-lighter w-[500px] self-end">
      <h1 className=" absolute w-full -right-20 -top-14 text-center text-cl-darker font-orelega-one text-2xl bg-light rounded-lg px-3 py-5">
        Engagement envers la Santé Animale et la Qualité
      </h1>
      <p className="pt-12 px-4">
        Nos poulets de 40 à 45 jours sont nourris avec des aliments de haute
        qualité produits par Grain du sud , assurant ainsi leur développement
        sain et robuste. Nous nous engageons à respecter les normes les plus
        strictes de bien-être animal et de pratiques d'élevage responsables,
        pour que vous receviez des animaux non seulement en excellente condition
        physique mais aussi élevés dans le respect des normes éthiques et
        environnementales.
      </p>
    </div>
    <img
      src="/images/ourchickens-s2.png"
      alt="img"
      className=" absolute w-72 left-0 -bottom-24"
    />
  </section>
);
