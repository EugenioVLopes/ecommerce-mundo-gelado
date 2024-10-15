import SectionsHeaders from "@/src/components/layout/SectionsHeaders";

export default function ContactPage() {
  return (
    <section className="my-8 text-center">
      <SectionsHeaders subHeader="Entre em" mainHeader="Contato" />
      <div className="mt-8">
        <a className="text-4xl" href="tel: +84996320320">
          84 996320320
        </a>
      </div>
    </section>
  );
}
