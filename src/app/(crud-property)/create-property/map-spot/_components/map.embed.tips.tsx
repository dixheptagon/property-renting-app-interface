import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function MapEmbedTips() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-md">
          <h1>
            How to get the Google Maps embed <b>&lt;iframe&gt;</b>
          </h1>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <ul className="space-y-2 text-sm">
            <li>
              <b>1. Go to Google Maps</b> Open https://www.google.com/maps in
              your browser.
            </li>
            <li>
              <b>2. Search Your Location</b> Type your property's full address
              or name into the search bar and press Enter.
            </li>
            <li>
              <b>3. Click the "Share" Button</b> Once you see the pin for your
              location, click the Share button.
            </li>
            <li>
              <b>4. Select "Embed a map"</b> A new window will pop up. At the
              top, click the "Embed a map" tab.
            </li>
            <li>
              <b>5. Copy the Code</b> You will see a preview of the map and an
              HTML code (it starts with &lt;iframe&gt;). Click the blue "COPY
              HTML" button.
            </li>
            <li>
              <b>6. Paste the Code</b> You're done! Now, come back to this page
              and paste the code you just copied into the form field below.
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-md">
          <h1>Simply paste the entire code you copied. No editing required!</h1>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Paste the entire code you copied directly from Google Maps. There's
            no need to edit it—we'll find the map link automatically.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
