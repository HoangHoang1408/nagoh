import easyinvoice from "easyinvoice";
import { toast } from "react-toastify";

export const downloadInvoice = async (booking) => {
  toast.info("Wait for a second!");
  const data = {
    documentTitle: "Booking Invoice",
    taxNotation: "vat",
    currency: "USD",
    marginTop: 25,
    marginRight: 25,
    marginLeft: 25,
    marginBottom: 25,
    logo: "https://firebasestorage.googleapis.com/v0/b/bookit-9a9e7.appspot.com/o/avatarImages%2F184309405_2814099595517419_4955544189098970950_n.jpg?alt=media&token=6653cc34-e31b-451f-9982-f0ad00a386f7", //or base64
    sender: {
      company: "Hoang",
      address: "Do em biet anh đang nghi gi?",
      zip: "1111",
      city: "HaNoi",
      country: "VietNam",
    },
    client: {
      company: `${booking.user.name.toUpperCase()}`,
      address: `${booking.user.email}`,
      zip: "",
      city: `Check In: ${new Date(booking.checkInDate).toLocaleString("en-UK", {
        month: "2-digit",
        day: "numeric",
        year: "numeric",
      })}`,
      country: `Check Out: ${new Date(booking.checkOutDate).toLocaleString(
        "en-UK",
        {
          month: "2-digit",
          day: "numeric",
          year: "numeric",
        }
      )}`,
    },
    invoiceNumber: `${booking._id}`,
    invoiceDate: new Date(Date.now()).toLocaleDateString("en-UK", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }),
    products: [
      {
        quantity: `${booking.daysOfStay}`,
        description: `${booking.room.name}`,
        tax: 0,
        price: booking.room.pricePerNight,
      },
    ],
    bottomNotice: "Hello from Hoang",
  };
  const result = await easyinvoice.createInvoice(data);
  easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf);
  toast.success("Downloaded!");
};
