import { Search } from "@material-ui/icons";
import SearchRounded from "@material-ui/icons/SearchRounded";
import styles from "./SearchInput.module.css";

const SearchInput = ({ ...rest }) => {
  return (
    <div className={styles.wrapper}>
      <SearchRounded color="inherit" />
      <input className={styles.input} {...rest} />
    </div>
  );
};

export default SearchInput;
