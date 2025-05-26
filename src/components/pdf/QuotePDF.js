import { jsPDF } from "jspdf";

export const generateQuotePDF = ({ name, email, price, droneCount, fixedCost }) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  const formatPrice = (price) => {
    const formattedNumber = new Intl.NumberFormat("da-DK").format(price >= 500000 ? 500000 : price);
    return price >= 500000 ? `${formattedNumber} kr. +` : `${formattedNumber} kr.`;
  };
  
  // Add logo/header
  doc.setFontSize(24);
  doc.text("Moonrise Tilbud", pageWidth / 2, 20, { align: "center" });
  
  // Add customer info
  doc.setFontSize(12);
  doc.text("Kundeoplysninger:", 20, 40);
  doc.text(`Navn: ${name}`, 20, 50);
  doc.text(`Email: ${email}`, 20, 60);
  
  // Add price breakdown
  doc.text("Prisspecifikation:", 20, 80);
  doc.text(`Fast opstartspris: ${formatPrice(fixedCost)}`, 20, 90);
  doc.text(`Budget til show: ${formatPrice(price - fixedCost)}`, 20, 100);
  doc.text(`Samlet pris: ${formatPrice(price)}`, 20, 110);
  
  // Add drone info
  doc.text("Show detaljer:", 20, 130);
  doc.text(`Antal droner: ${droneCount}`, 20, 140);
  
  // Add custom show info
  doc.text("Custom shows:", 20, 160);
  doc.setFontSize(10);
  doc.text([
    "Vil du have et unikt droneshow skræddersyet til dit event?",
    "Vi tilbyder også custom shows med specielle formationer og effekter.",
    "• Priser fra 250.000 kr.",
    "• Mulighed for unikke formationer og mønstre",
    "• Skræddersyede løsninger til dit event",
    "Kontakt os for en uforpligtende samtale om mulighederne."
  ], 20, 170);
  
  // Add terms
  doc.text([
    "Bemærk:",
    "• Alle priser er vejledende og inkl. moms",
    "• Det endelige tilbud kan variere baseret på specifikke krav og lokation",
    "• Tilbuddet er gyldigt i 30 dage",
    "• Kontakt os for at diskutere specifikke ønsker og muligheder"
  ], 20, 200);
  
  // Add contact info
  doc.text([
    "Moonrise ApS",
    "Email: info@moonrise.dk",
    "Telefon: +45 40 27 17 37",
    "www.moonrise.dk"
  ], 20, 250);

  // Return the PDF as base64
  return doc.output('datauristring');
};
