import { makeStyles } from '@mui/styles';

const useWelcomePageStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(8),
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  subtitle: {
    fontSize: '1.2rem',
    marginBottom: theme.spacing(4),
    color: '#555',
  },
  button: {
    fontSize: '1rem',
    padding: theme.spacing(1, 4),
  },
  link: {
    textDecoration: 'none', // Remove underlines from the link
  },
}));

export default useWelcomePageStyles;
