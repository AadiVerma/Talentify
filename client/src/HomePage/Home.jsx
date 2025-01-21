import Page1 from "./section1";
import Section2 from "./section2";
import Section3 from "./section3";
import Section4 from "./Section4";
import Section5 from './Section5'
export default function Home() {
    return (
        <div className="bg-gray-100/30 ">
            <section>
                <Page1 />
            </section>
            <section>
                <Section2 />
            </section>
            <section className="p-10">
                <Section3 />
            </section>
            <section>
                <Section4 />
            </section>
            <section>
                <Section5 />
            </section>
        </div>
    )
}