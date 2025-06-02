import { jsPDF } from "jspdf";

const translations = {
  da: {
    title: "Moonrise Tilbud",
    customerInfo: "Kundeoplysninger",
    name: "Navn",
    priceSpec: "Prisspecifikation",
    setupPrice: "Fast opstartspris",
    showBudget: "Budget til show",
    totalPrice: "Samlet pris",
    showDetails: "Show detaljer",
    droneCount: "Antal droner",
    customShows: "Custom shows",
    customShowsText: [
      "Vil du have et unikt droneshow skræddersyet til dit event?",
      "Vi tilbyder også custom shows med specielle formationer og effekter.",
      "• Priser fra 250.000 kr.",
      "• Mulighed for unikke formationer og mønstre",
      "• Skræddersyede løsninger til dit event",
      "Kontakt os for en uforpligtende samtale om mulighederne."
    ],
    note: "Bemærk",
    terms: [
      "• Alle priser er vejledende og inkl. moms",
      "• Det endelige tilbud kan variere baseret på specifikke krav og lokation",
      "• Tilbuddet er gyldigt i 30 dage",
      "• Kontakt os for at diskutere specifikke ønsker og muligheder"
    ],
    currency: "kr.",
    contactInfo: [
      "Moonrise ApS",
      "Email: info@moonrise.dk",
      "Telefon: +45 40 27 17 37",
      "www.moonrise.dk"
    ]
  },
  en: {
    title: "Moonrise Quote",
    customerInfo: "Customer Information",
    name: "Name",
    priceSpec: "Price Specification",
    setupPrice: "Fixed setup price",
    showBudget: "Show budget",
    totalPrice: "Total price",
    showDetails: "Show Details",
    droneCount: "Number of drones",
    customShows: "Custom Shows",
    customShowsText: [
      "Would you like a unique drone show tailored to your event?",
      "We also offer custom shows with special formations and effects.",
      "• Prices from 250.000 DKK",
      "• Possibility for unique formations and patterns",
      "• Tailored solutions for your event",
      "Contact us for a non-binding conversation about the possibilities."
    ],
    note: "Note",
    terms: [
      "• All prices are indicative and include VAT",
      "• The final quote may vary based on specific requirements and location",
      "• This quote is valid for 30 days",
      "• Contact us to discuss specific wishes and possibilities"
    ],
    currency: "DKK",
    contactInfo: [
      "Moonrise ApS",
      "Email: info@moonrise.dk",
      "Phone: +45 40 27 17 37",
      "www.moonrise.dk"
    ]
  }
};

export const generateQuotePDF = ({ name, email, price, droneCount, fixedCost, language = 'da' }) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  const formatPrice = (price) => {
    const currency = translations[language].currency;
    const formattedNumber = new Intl.NumberFormat('da-DK').format(price >= 500000 ? 500000 : price);
    return price >= 500000 ? `${formattedNumber} ${currency} +` : `${formattedNumber} ${currency}`;
  };
  
  const t = translations[language];

  // Add logo/header
  doc.setFontSize(24);
  doc.text(t.title, pageWidth / 2, 20, { align: "center" });
  
  // Add customer info
  doc.setFontSize(12);
  doc.text(`${t.customerInfo}:`, 20, 40);
  doc.text(`${t.name}: ${name}`, 20, 50);
  doc.text(`Email: ${email}`, 20, 60);
  
  // Add price breakdown
  doc.text(`${t.priceSpec}:`, 20, 80);
  doc.text(`${t.setupPrice}: ${formatPrice(fixedCost)}`, 20, 90);
  doc.text(`${t.showBudget}: ${formatPrice(price - fixedCost)}`, 20, 100);
  doc.text(`${t.totalPrice}: ${formatPrice(price)}`, 20, 110);
  
  // Add drone info
  doc.text(`${t.showDetails}:`, 20, 130);
  doc.text(`${t.droneCount}: ${droneCount}`, 20, 140);
  
  // Add custom show info
  doc.text(`${t.customShows}:`, 20, 160);
  doc.setFontSize(10);
  doc.text(t.customShowsText, 20, 170);
  
  // Add terms
  doc.text(`${t.note}:`, 20, 200);
  doc.text(t.terms, 20, 210);
  
  // Add contact info
  doc.text(t.contactInfo, 20, 250);

  // Return the PDF as base64
  return doc.output('datauristring');
};
