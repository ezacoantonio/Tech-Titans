import { makeStyles } from "@mui/styles";

const useWelcomePageStyles = makeStyles({
  root: {
    margin: "10px", // Adjusts the margin around the entire page
    padding: "10px", // Adjusts the padding inside the root element
  },
  welcomeText: {
    fontFamily: "Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    textAlign: "center",
    fontWeight: "bold",
    color: "#42a5f5", // A shade of blue; feel free to choose your preferred blue tone
    fontSize: "1.8rem", // Reduced font size; adjust as needed
    animation: "$fadeIn 2s ease-in-out",
    // Add additional modern styling here as desired
  },
  "@keyframes fadeIn": {
    "0%": {
      opacity: 0,
      transform: "translateY(-20px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },

  welcomeImage: {
    width: "15%", // Adjust width as needed
    height: "30%", // Adjust height as needed
    objectFit: "cover", // Adjust how the image fits into the container
    display: "block", // Use block layout for the image
    margin: 'auto'
    // Add vertical centering if needed and more styles as required
  },
  carouselPaper: {
    height: "500px", // Fixed height for the carousel
    width: "100%", // Width is 100% to span the full width of the container
    marginBottom: "10px", // Space below each carousel item
    overflow: "hidden", // Prevents images from overflowing the container
  },
  carouselImage: {
    width: "100%", // Make image span the full width of the paper
    height: "100%", // Make image span the full height of the paper
    objectFit: "cover", // Ensures the image covers the container fully
    objectPosition: "center", // Centers the image within the container
  },
  featuredSection: {
    marginTop: "10px", // Adds space above the featured section
    marginBottom: "10px", // Adds space below the featured section
  },
  testimonialsTitle: {
    marginTop: "10px", // Adds space above the testimonials title
  },
  testimonialCard: {
    margin: "10px", // Add space around each card
  },
  testimonialsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    margin: "20px 20px", // You can adjust the margin as needed
  },
  testimonialImage: {
    maxHeight: "100px", // Adjust the height as needed
    maxWidth: "100px", // Adjust the width as needed
    objectFit: "cover",
    display: "block", // Use block layout for the image
    marginLeft: "auto", // These two lines center the image horizontally
    marginRight: "auto",
    borderRadius: "50%", // Rounds the image
  },
  newsletterSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Centers horizontally in a flex column
    justifyContent: "center", // Centers vertically
    padding: "20px", // Adds some padding around the section
    gap: "10px", // Adds space between items
  },
  socialMediaLinks: {
    display: "flex",
    justifyContent: "space-around", // Spreads items evenly across the container
    alignItems: "center",
    padding: "20px",
    // Other general styles for the container
  },
  iconLink: {
    "&:hover": {
      // General hover effect, if needed
    },
  },
  instagramHover: {
    "&:hover": {
      color: "#E1306C", // Instagram color
    },
  },
  facebookHover: {
    "&:hover": {
      color: "#3b5998", // Facebook color
    },
  },
  twitterHover: {
    "&:hover": {
      color: "#1DA1F2", // Twitter color
    },
  },
  youtubeHover: {
    "&:hover": {
      color: "#FF0000", // YouTube color
    },
  },
  linkedinHover: {
    "&:hover": {
      color: "#0077b5", // LinkedIn color
    },
  },
  footer: {
    marginTop: "10px", // Adds space above the footer
  },
});

export default useWelcomePageStyles;
