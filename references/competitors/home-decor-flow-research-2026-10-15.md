# Home & Decor e-commerce flow research for Moore (mymore.design)

Research date: 2026-10-15. Method: WebFetch (text extraction of pages) and WebSearch only. Direct network and Playwright to these sites were blocked by the environment, so **nothing was checked visually**. Swatch behaviour, image swapping, sticky bars and similar JS-only UI could not be confirmed and are marked as such.

Legend: **[O]** observed in fetched page text. **[I]** inferred or my recommendation. **[N/O]** not observed, because the page was not rendered or the content was missing.

---

## 1. Ecom Design Awards: Home & Decor category

Source: https://www.ecomdesignawards.com/category/home-decor (pages 1 to 4 read, and a page 5 exists). EDA's main award is **"Store of the Day"** (SOTD, announced daily). A smaller set also wins **"Store of the Month"** (SOTM). Agency credits come from EDA. Page 1's headings were ambiguous, so the agency attribution there is uncertain.

### Store of the Month winners in Home & Decor [O]
(Source: https://www.ecomdesignawards.com/store-of-the-month-winners)
| Store | SOTM date | URL |
|---|---|---|
| Gardinex | Apr 30, 2026 | https://www.gardinex.com/en-GB |
| Fred Home | Mar 4, 2025 | https://fredhome.com.au/ |
| In Common With | Dec 18, 2024 | https://www.incommonwith.com/ |
| Powersheds | Oct 25, 2024 | https://www.powersheds.com/ |
| Acme | Sep 18, 2024 | https://acmecups.nz/ |
| ReFramed | Apr 18, 2024 | https://reframedbrand.com/ |
| Holcomb Studio | Mar 28, 2024 | https://holcombstudio.com/ |
| NORR11 | Feb 12, 2024 | https://norr11.com/ |
| Props | Sep 5, 2023 | (EDA page) |
| Nightworks Studio | Feb 15, 2023 | (EDA page) |
| Sol'ace | Sep 20, 2022 | (EDA page) |
| Ensembl | Aug 15, 2022 | (EDA page) |
| 696 NYC | Jul 23, 2022 | (EDA page) |

### Store of the Day winners, Home & Decor (pages 1 to 4) [O]
- **Page 1:** Fume, Flamingo Estate, Huey Lightshop, Zoumboulakis Galleries, Cocoon, Ceragres, Halcyon, Hoom, Object & Archive, Bard, Eight Sleep, Merit, Gardinex, Mustard Made, Stephanie Thatenhorst, Kyn & Folk, **Vipp** (vipp.com/en), **Massproductions** (massproductions.se), Zia Tile, HEP, Agio, Adi Goodrich, **Bemz** (bemz.com, agency Grebban), House of Corto.
- **Page 2:** Rooof, ohm, Koru, eisku, Cancan Furnishings, Norrlands trä, MSCHF x AMG, Kosta Boda (Grebban), Pedestal (Good City), Current Collection, Luminaire Authentik, RA Workshop, Geste, House of Spoils, Matthew Fisher (CUSP), Maison Sarah Lavoine (Index Studio), Tablelab, Duchateau (Rejouice), Bloom & Wolf, **Fred Home**, Qudrix, **Kann Design** (kanndesign.com, Studio Krabb), Osorno (Studio Krabb), **Muuto** (muuto.com).
- **Page 3:** CC-Tapis, Wall of Art, Svenskt Tenn, **In Common With** (Baggy Studio), Oakâme (Beaucoup), Archyvio, Kave Home, Atmos Lamp/Ayocin (Obys), **Caravane** (caravane.com, Numbered), Powersheds, Huey Light Shop, Lick, Willett, Acme, GoodMood, Hyoumankind, Woodwrights, Lokal Poster Co., byon, Paper + Land, Objekte Unserer Tage, Context Gallery, Branderr, Uncommon.
- **Page 4:** ReFramed (Studio Kiln), Prama, Cliik, Palet, In Substance, Cleverly, Rebecca Atwood (Fuzzco), **Holcomb Studio** (Parker Studio), Bonsoirs (Numbered), Faum, Mizzuni, **NORR11** (Spring/Summer), Paris Tile (Fhoke), Lyon Beton, Nordisk, Tolix (Period), Noho, Curio (Work & Co), Bureau Benjamin, Lastlight, Actos, Pon, Subtle Bodies.

### Stores chosen for analysis (10) and why [I]
| Store | URL | Award | Relevance to Moore |
|---|---|---|---|
| In Common With | https://www.incommonwith.com/ | SOTM Dec 2024 + SOTD | Premium made-to-order lighting from a Brooklyn studio, NYC showroom, trade program, finish samples |
| NORR11 | https://norr11.com/ | SOTM Feb 2024 + SOTD | Premium furniture with no grid prices, a configurator that ends in a quote, 2D/3D/Revit downloads for professionals |
| Vipp | https://vipp.com/en | SOTD | Premium furniture with a brand/editorial-led site, trade program, configurators, pre-order PDPs |
| Muuto | https://www.muuto.com/ | SOTD | Premium furniture with stated lead times on the PDP, architect files, AR, configurator |
| Massproductions | https://www.massproductions.se/ | SOTD | Designer furniture with Made to Order / In stock states, pre-order, ex-VAT price for B2B |
| Kann Design | https://kanndesign.com/ | SOTD | Closest analogue to Moore: workshop-made furniture, "Sur commande, 9 à 14 semaines", pro downloads, projects |
| Caravane | https://caravane.com/ | SOTD | Mixes stock and made-to-order: "sur devis" made-to-measure, store appointments, fabric samples |
| Bemz | https://bemz.com/en-gb | SOTD | Model + fit + fabric configurator, "5 free fabric samples", estimated ship date on the PDP |
| Holcomb Studio | https://holcombstudio.com/ | SOTM Mar 2024 | Clean pre-order messaging ("Pre-Order: Ships Late October") |
| Fred Home | https://fredhome.com.au/ | SOTM Mar 2025 | Premium positioning, a "Commissions" page for bespoke work, Trade/Press |

Also benchmarked as requested: **Sklum** (https://www.sklum.com), a mass-premium Spanish furniture e-tailer.

---

## 2. Flow patterns by stage

### 2.1 Awareness / landing
- **Vipp [O]:** The homepage leads with brand and editorial rather than products: Vipp Residences ("CO-OWNERSHIP FOR DESIGN LOVERS"), new launches ("THE NEXT CHAPTER IN WORKSPACE"), designer interviews, the Vipp Apartment and guesthouses. Commerce comes second.
- **NORR11 [O]:** Video hero for the modular Tribal sofa, mission line "Our mission is to create timeless pieces on the leading edge of design", and a module promoting the sofa configurator ("download, share, or request a quote").
- **Massproductions [O]:** Positions the brand through production ("The beauty of efficient and sustainable production"), shows a "COMING SOON" product, and puts Journal and Projects modules on the homepage.
- **Kann Design [O]:** The homepage stack mixes a project case (coffee shop), an archive sale ("Jusqu'à -70%…"), a designer collection (Pastille by Inga Sempé) and a behind-the-scenes manufacturing article.
- **In Common With [O]:** Catalog-scale proof ("six collections, nine series, and over 150 products"), New/Featured product cards, an NYT press feature, a showroom module with "Book an Appointment", and a Trade Program module.
- **Caravane [O]:** The announcement bar leads with shipping. Seasonal fabric campaign hero ("Nouveaux tissus, nouvelles envies"), best-sellers, "Shop the Look".
- **Bemz [O]:** The announcement bar rotates "Order 5 free fabric samples" and "Free Shipping over £199". The hero promise "Choose your model, fit and fabric" describes the whole flow in one line.
- **Sklum [O]:** Promo-led: "-12% en pedidos superiores a 299€ | Código: MIDSALE12" plus a countdown timer, which read all zeros (broken), and the headline "Muebles de diseño: Donde cada pieza cuenta tu historia".

### 2.2 Desire / discovery
| Store | Nav model | Price on grid? |
|---|---|---|
| NORR11 | Category + ~35 named collections + Inspiration/Stories/Cases/Colour inspiration | **No** [O] |
| Vipp | Products, Kitchens, Guesthouses, World of Vipp (Spaces/People/Home Stories), Professionals | **No** on homepage modules [O] |
| Muuto | Category mega-menu + product families + tools (Product Planner, AR, Lighting guide) + Stories/Designers | Grid shows a "Recommended retail price" label. Values were not rendered in the fetch [N/O] |
| Massproductions | Category + Special Editions + Journal + Projects + Discover | **Yes**, incl. VAT and ex-VAT ("Regular price 29,523 kr Ex VAT 22,142 kr") [O] |
| Kann Design | Category (Assise, Rangement, Table et bureau) + Projects + Journal + Designers + dealer locator ("Points de vente") | Not seen on homepage cards [N/O]. The PDP shows the price [O] |
| Caravane | 13 categories, stock vs "sur mesure" split, Tissus au mètre, Journal, Shop the look | **Yes** on stock items, with a "+15" variant count. Made-to-measure items show no price ("sur devis") [O] |
| Bemz | Shop by model (IKEA), Fabrics & swatches, Inspiration | **Yes**, as "From" + "+ 167 Fabrics" [O] |
| In Common With | Shop (All, New, Lighting, Collections, Finish Samples, Bulbs/Spare parts) | N/O |
| Fred Home | Shop: Edits / Products / Space / Brands; Commissions; Philosophy | **Yes** (AUD) [O] |
| Holcomb | Category with item counts ("Kitchen Tools (09)") | **Yes** [O] |
| Sklum | Category + **Espacios (rooms)** + Inspiración/Blog + Sklum PRO | **Yes**, with strikethrough old price. "En stock" badge. "Entrega rápida (294)" filter [O] |

Room-based browsing appeared only on **Sklum** (Espacios: salón, comedor, dormitorio…) and partly on **Fred Home** ("Space") [O]. The premium brands browse by category, collection and designer. Editorial is handled through cases, projects, journal and home stories (NORR11, Kann, Massproductions, Vipp, Muuto) [O].

### 2.3 Product page
| Store | Lead-time messaging (exact) | Options / configurator | Downloads | CTA |
|---|---|---|---|---|
| **Kann Design** (https://kanndesign.com/products/bureau-pastille-pastille-2-drawers-d3065) | "Sur commande, Livraison sous 9 à 14 semaines"; "Pièce réalisée sur commande"; "Fabriqué dans notre atelier familial au Liban" [O] | Single SKU. Variants are separate products [O] | "Voir la fiche produit en PDF" + pro folders (3D, product sheets, image bank) [O] | "Ajouter au panier" + "Paiement en 3 fois disponible dès 300 €" [O] |
| **Muuto** (Outline Sofa) | "Estimated lead time: 9-11 weeks" [O] | "Customise" multi-step configurator, AR icon, upholstery/base options [O] | Fact sheet, product declaration, instructions, "Download Architect Files here:" (2D/3D/Revit), dimension drawing [O] | Add to cart (templated) [O] |
| **Caravane** (Loveseat Holi) | "Délai de livraison : 6 semaines" above the button; "Ce produit est fabriqué à la commande et nécessite un délai d'environ 6 semaines…" [O] | Named colour swatches (Ivoire, Galet…), convertible toggle [O]. Image swap N/O | none | "Ajouter au panier" + "Payer en 3x". Bespoke version: "Créez votre canapé sur-mesure en boutique" → "prendre rendez-vous" [O] |
| **Bemz** (Ektorp cover) | "Made to order in Europe"; "Est. shipment date: 16/11/2026" (about 4.5 weeks out) [O] | "Change Fabric … + 168 Fabrics", "Change Fit & Style" [O] | none | "Add to cart" + "Add free sample" (0 kr) directly on the PDP [O] |
| **Vipp** (Work Desk) | No lead time stated; the only CTA is "Preorder now" [O] | 2 image swatches (wood/leather) [O]. Image swap N/O | Dimension line drawing on the PDP. pCon, image bank and configurators sit elsewhere [O] | "Preorder now", "Free shipping", 5-year warranty, EN 15372 certification [O] |
| **NORR11** (Reposé sofa) | none [O] | Module packshots + "Start building with the modules and fabric you want" → configurator [O] | "Download material" [O] | Quote via the configurator ("download, share, or request a quote"). Price only in metadata (EUR 6.200) [O] |
| **Massproductions** (4PM) | Status set "Made to Order / In stock / Out of stock"; "Select a purchase option to pre order this product"; countdown placeholders were empty [O] | "FINISH" selector [O] | Zip download (4_PM_Chaise.zip) [O] | "ADD TO CART" + "NOTIFY ME" + back-in-stock form; ex-VAT price; awards cited [O] |
| **Holcomb** (Oil Can) | "Pre-Order: Ships Late October" [O] | none | none | "Add to Cart", which conflicts with a "Coming Soon — Notify me" block [O] |
| **In Common With** | FAQ: "Production times vary per product and are noted on the product page"; lead times "two weeks to four, six, 12, and 16 weeks" [O] | "range of sizes and finishes" [O]. Selectors N/O (JS) | N/O | N/O |
| **Sklum** (Coco / Zofli sofas) | "En stock, entrega estimada entre el 22/10 y el 27/10"; for a non-stock item "Entrega estimada entre el 16/11 y el 18/11" + "Avísame cuando haya stock" [O] | Image swatch thumbnails with fabric names ("Chenilla Gruesa Blanco", 4 options) [O] | "Documentación 3D: Archivo 3D" on every PDP [O] | "Añadir al carrito ( 679,95 )", reviews "4,9 23 reseñas", "¿Eres Profesional? Date de alta…" [O] |

#### Sklum: how it communicates made-to-order and pre-sale timing
- **[O]** Every PDP gives a concrete **date range** ("Entrega estimada entre el 22/10 y el 27/10"). Stocked items carry an "En stock" prefix. Non-stocked items show a later range (about 4 to 5 weeks out) and an "Avísame cuando haya stock" link.
- **[O]** On grids, the only delivery signal is the "En stock" badge plus an "Entrega rápida" filter. The words "Preventa", "bajo pedido" and "Disponible a partir de" did not appear on any page fetched.
- **[O]** Terms (https://www.sklum.com/es/content/65-condiciones-generales): out-of-stock items can be **"RESERVAR"**-ed at checkout. The customer is told within "24/48 horas" if an item is unavailable. Sklum "podrá suministrar un producto de similares características sin aumento de precio", and refunds come within 15 days. For mixed carts, "el sistema calculará automáticamente la fecha de entrega definitiva, considerando todos los artículos". Shipping conditions page: https://www.sklum.com/es/content/63-condiciones-de-envio.
- **[O]** Risk evidence: public complaints (e.g. https://portaldaqueixa.com/brands/sklum/complaints/sklum-atraso-prolongado-e-ma-gestao-de-stock-5-meses-e-ainda-sem-encomenda-160768126) describe the consolidated date slipping from 7 Aug to 19 Sep, no proactive updates, and refused partial shipment. Many similar complaints appear on portaldaqueixa.com and OCU.
- **[I]** Lesson for Moore: show a date range, not a vague promise. For ~120-day pieces, back it with proactive milestone updates. Never consolidate the stocked *tomada* with a made-to-order piece.

### 2.4 Conversion
- **Quote instead of cart:** NORR11's configurator output is "download, share, or request a quote" [O]. Caravane sells made-to-measure "sur devis" and through in-store appointments [O]. Vipp offers "Book a kitchen meeting" (configurator ?page=bookconsultant) [O]. Fred Home Commissions: "get in touch with us…", with no form [O].
- **Cart with long lead time:** Kann, Caravane, Bemz, Muuto and Massproductions all sell made-to-order pieces through the normal cart, showing the lead time next to the button [O]. Vipp uses "Preorder now" [O].
- **Samples:** Bemz offers "Order 5 free fabric samples" in the banner plus "Add free sample" on the PDP [O]. In Common With has a "Finish Samples" collection [O], with contents N/O. Caravane has an "Echantillons de tissus" category [O].
- **Trade / architect programs:**
  - In Common With [O]: dedicated account manager, trade pricing + volume discounts, portal with "Lead times and estimated ship dates", application form.
  - Vipp Trade Program USA [O]: "Exclusive trade discount", dedicated account manager, apply via partner.vipp.com.
  - NORR11 Professionals [O]: Toolbox, Sofa Configurator, Materials, Pricelists, Quick Ship, Catalogs, "2D, 3D & Revit files", hosted on professionals.norr11.com.
  - Muuto [O]: 2D DWG; 3D in "DWG, 3DS, OBJ, SketchUp and Revit"; pCon.catalog; Partner Login (https://professionals.muuto.com/faq/files--planning).
  - Kann [O]: pro folders on the PDP, plus a separate "agencement" (contract) site.
  - Sklum [O]: "Sklum PRO" and "¿Eres Profesional?" on every PDP.
- **Email capture:** Most premium brands offer no incentive (Vipp, ICW, Holcomb, Massproductions, Fred Home) [O]. Kann promises "offres" [O]. Sklum offers 10% off the first purchase over €249 [O]. Bemz segments signups by asking for the IKEA series [O].
- **Payment:** Instalments are shown at Caravane ("Paiement en 3x sans frais", Alma) and Kann ("Paiement en 3 fois dès 300 €") [O].

### 2.5 Trust
- **Projects / cases:** NORR11 "Cases" (The Japanese Pagoda, Chancery House), Kann "Projets" (Monocle, Imagine Office…), Massproductions Projects [O].
- **Press:** In Common With features an NYT piece on its homepage [O]. Fred Home has a /press page [O].
- **Showroom / appointments:** In Common With (Quarters, 383 Broadway, "Book an Appointment"), Caravane ("Rendez-vous en boutique"), Vipp (store locator, kitchen consult), Muuto (stores/showrooms) [O].
- **Craft and provenance:** Kann ("Fabriqué dans notre atelier familial au Liban"), ICW (Brooklyn production studio), Bemz ("Made to order in Europe", factory story, B Corp), Massproductions (designer + awards + CO2 figure) [O].
- **Guarantees / specs:** Vipp (5-year warranty, EN 15372), Bemz (3-year guarantee), Caravane (1/2/5-year warranty split) [O].
- **Reviews:** Only Sklum shows them (4,9, 23 reseñas) [O]. None of the premium brands do [O].

### 2.6 Post-purchase / CRM signals (mostly from policy and FAQ text)
- **In Common With FAQ [O]:** "Products noted with a 3-day lead time will ship separately, and all other products with extended lead times will ship together with the longest lead time noted." Tracking is sent by email at shipment. Order status is available in the account or by email. Expedited production is available on request. Made-to-order items are final sale once production begins (EU withdrawal handled explicitly).
- **Sklum [O]:** "Te avisaremos por mail cuando tu pedido haya sido enviado". Customers can reserve out-of-stock items. Complaints show a gap in proactive updates (see 2.3).
- **Back-in-stock / notify:** Caravane ("M'alerter de sa disponibilité"), Massproductions (NOTIFY ME), Sklum (Avísame), Holcomb (Notify me) [O].
- **Care and aftercare:** Vipp (care and warranty pages), Muuto (care by material, spare parts via customercare@), Massproductions (Care and Maintenance), Holcomb (product FAQ) [O].
- **Caravane inconsistency [O]:** the footer promises "Retours sous 14 jours", but the made-to-order PDP says the item "ne peut être ni retourné ni échangé". The policy has to be stated consistently.
- Post-purchase emails and milestone updates could not be observed without buying [N/O].

---

## 3. Best practices by stage (each with evidence)

### Awareness / landing
1. **Lead with world and story, not discounts.** Vipp's homepage is editorial-first (Residences, designer interviews, apartment). https://vipp.com/en [O]
2. **Show the making.** Kann puts a behind-the-scenes manufacturing article and project stories on the homepage. https://kanndesign.com/ [O]
3. **Say the buying model up front.** Bemz explains the whole flow in one line ("Choose your model, fit and fabric"). https://bemz.com/en-gb [O] For Moore [I]: "Feito sob encomenda · escolha madeira, tecido e acabamento".
4. **Promote the configurator or quote path on the homepage.** NORR11's sofa-configurator module ("download, share, or request a quote"). https://norr11.com/ [O]
5. **Avoid broken urgency devices.** Sklum's countdown displayed all zeros. https://www.sklum.com [O]

### Desire / discovery
1. **Browse by collection and designer as well as category.** NORR11 has ~35 named collections, Muuto has product families. https://norr11.com/ , https://www.muuto.com/ [O]
2. **Projects/cases as an inspiration layer.** NORR11 Cases, Kann Projets, Massproductions Projects. [O]
3. **Signal option depth on cards.** Bemz shows "From … + 167 Fabrics" and Caravane shows "+15". https://bemz.com/en-gb , https://caravane.com/ [O]
4. **Price on the grid is a positioning choice.** NORR11 and Vipp hide it (it feels premium, B2B-friendly and quote-led). Massproductions, Caravane, Kann (PDP) and Sklum show it [O]. [I] For Moore, "a partir de R$" on cards pre-qualifies leads before WhatsApp without exposing the full configuration price.
5. **Room-based navigation is a mass-market pattern** (Sklum "Espacios"). The premium sites browse by collection [O]. [I] Moore can use rooms as editorial entry points rather than its main navigation.

### Product page
1. **Put lead time next to the CTA, in plain words.** Kann: "Sur commande, Livraison sous 9 à 14 semaines". Caravane: "Délai de livraison : 6 semaines" above the button. Muuto: "Estimated lead time: 9-11 weeks". [O]
2. **Give a date where possible.** Bemz: "Est. shipment date: 16/11/2026". Sklum: "Entrega estimada entre el 22/10 y el 27/10". [O] [I] For Moore, show a computed "Previsão de entrega: a partir de [mês/ano]" (~120 days).
3. **Name the swatches and show material on the PDP.** Sklum names image swatches ("Chenilla Gruesa Blanco"), Caravane names colours, Bemz shows "Change Fabric + 168". [O] Whether the image swaps on selection was N/O.
4. **Architect assets on the PDP.** Muuto: "Download Architect Files here" (2D/3D/Revit) + fact sheet. Kann: "Voir la fiche produit en PDF". Sklum: "Documentación 3D: Archivo 3D". [O]
5. **Pair specs with trust items.** Vipp lists dimensions, line drawing, EN 15372 and a 5-year warranty. Kann gives the designer story and workshop provenance. [O]

### Conversion
1. **Quote and consult path for configurable pieces.** NORR11 configurator → request a quote. Caravane "sur devis" + "prendre rendez-vous". Vipp "Book a kitchen meeting". [O] [I] Moore's equivalent: a pre-filled WhatsApp message with product, wood, fabric and finish.
2. **Free or cheap samples as the micro-conversion.** Bemz: "Order 5 free fabric samples" + "Add free sample" on the PDP. https://bemz.com/en-gb [O] ICW: Finish Samples collection. [O]
3. **Structured trade program.** In Common With (account manager, trade pricing, portal with lead times and ship dates) https://www.incommonwith.com/pages/trade-program. Vipp Trade Program USA https://vipp.com/en/professionals/trade-program-usa [O]
4. **Professional toolbox hub.** NORR11 Professionals: 2D/3D/Revit, pricelists, materials, catalogs. Muuto: DWG/3DS/OBJ/SketchUp/Revit + pCon. [O]
5. **Keep the stock SKU in a clean, separate checkout.** ICW ships in-stock items separately with their own tracking. https://www.incommonwith.com/pages/faqs [O] [I] Moore should keep the tomada purely transactional.

### Trust
1. **Showroom with appointment booking.** In Common With "Book an Appointment" at Quarters, Caravane "Rendez-vous en boutique". [O]
2. **Credible press, shown sparingly.** ICW features one NYT article on the homepage. [O]
3. **Projects that show real spaces.** NORR11 Cases, Kann Projets. [O]
4. **Provenance and craft claims.** Kann's family workshop, Bemz's "Made to order in Europe" + factory + B Corp. [O]
5. **Consistent policies for made-to-order items.** ICW states final sale once production starts, plus EU withdrawal. Caravane's contradictory return copy is the counter-example. [O]

### Post-purchase / CRM
1. **Say the multi-lead-time shipping rule clearly.** ICW FAQ (in-stock ships separately, the rest ships with the longest lead). [O]
2. **Avoid Sklum's failure mode.** Consolidated dates that slip without proactive updates generated public complaints. [O] [I] Moore should send milestone messages (pedido confirmado → produção iniciada → acabamento → expedição) through WhatsApp/email.
3. **Aftercare content.** Care pages by material (Muuto, Vipp, Massproductions), plus warranty pages. [O]
4. **Notify-me capture.** Caravane, Massproductions and Sklum all collect intent emails. [O] [I] Moore can reuse this for new-collection waitlists.
5. **Order status in the account.** ICW and Sklum both offer customer-area order status. [O]

---

## 4. Implications for Moore (inferred) [I]
- PDP pattern: gallery → name/designer → "a partir de R$" (or no price) → wood/fabric/finish swatches → "Feito sob encomenda · ~120 dias · previsão [mês]" → primary CTA "Solicitar orçamento no WhatsApp" (pre-filled with SKU + selections) → secondary "Pedir amostras" → spec accordion (dimensions, materials, care) → "Arquivos para arquitetos (2D DWG / 3D SKP, OBJ, Revit)".
- Tomada: a normal buy box, "Em estoque · envio em X dias", its own checkout, never bundled with made-to-order pieces.
- Architect hub: one page with blocks, ficha técnica, materials library, plus an application form for the trade program (NORR11 / ICW / Vipp model). Decide early whether downloads are open (Sklum, Kann) or gated (ICW portal, NORR11/Muuto subdomain). Gating gives leads, open access gives specification reach.
- CRM: a post-quote WhatsApp sequence plus production milestone updates. This is where Sklum fails publicly.

## Sources
- https://www.ecomdesignawards.com/category/home-decor (pages 1 to 4), https://www.ecomdesignawards.com/store-of-the-month-winners
- https://www.incommonwith.com/ , /pages/trade-program, /pages/faqs, /collections/finish-samples, /products/ceramic-disc-surface-mount
- https://norr11.com/ , /products/repose-sofa, /collections/chairs, /pages/sofa-configurator, /pages/quick-ship, /pages/downloads-2d-3d-revit
- https://vipp.com/en , /products/work-desk, /professionals/trade-program-usa
- https://www.muuto.com/ , /product/Outline-Sofa-3-Seater--OU3S/OU3SCD12101/, https://professionals.muuto.com/faq/files--planning
- https://www.massproductions.se/ , /products/4pm
- https://kanndesign.com/ , /products/bureau-pastille-pastille-2-drawers-d3065
- https://caravane.com/ , /products/loveseat-holi-samba-120-coton-lin-viscose
- https://bemz.com/en-gb , /products/EKT1-CLS101
- https://holcombstudio.com/ , /products/oil-can
- https://fredhome.com.au/ , /commissions
- https://www.sklum.com/es/ , /633-comprar-sofas, Coco and Zofli PDPs, /content/63-condiciones-de-envio, /content/65-condiciones-generales
- https://portaldaqueixa.com/brands/sklum/complaints/sklum-atraso-prolongado-e-ma-gestao-de-stock-5-meses-e-ainda-sem-encomenda-160768126
