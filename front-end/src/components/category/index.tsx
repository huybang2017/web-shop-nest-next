'use client'

import { Accordion, AccordionItem } from '@nextui-org/react'

export default function Category() {
  const defaultContent =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

  const itemClasses = {
    base: 'py-0 w-full',
    title: 'font-normal text-medium',
    trigger: 'py-0 pt-4 flex items-center',
    indicator: 'text-medium',
    content: 'text-small px-2',
  }
  return (
    <div>
      <ul className="space-y-4">
        <Accordion showDivider={false} itemClasses={itemClasses}>
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            title="Woman's Fashion"
          >
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 2" title="Men's Fashion">
            {defaultContent}
          </AccordionItem>
        </Accordion>

        {/* Other categories outside the Accordion */}
        <li className="px-2">
          <span className="cursor-pointer">Electronics</span>
        </li>
        <li className="px-2">
          <span className="cursor-pointer">Home & Lifestyle</span>
        </li>
        <li className="px-2">
          <span className="cursor-pointer">Medican</span>
        </li>
        <li className="px-2">
          <span className="cursor-pointer">Sports</span>
        </li>
        <li className="px-2">
          <span className="cursor-pointer">Baby's & Toy</span>
        </li>
        <li className="px-2">
          <span className="cursor-pointer">Heathy & Beauty</span>
        </li>
      </ul>
    </div>
  )
}
