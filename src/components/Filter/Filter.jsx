import css from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => (
  <label className={css.filter}>
    Find contacts by name
    <input
      type="text"
      className={css.filterInput}
      value={value}
      onChange={onChange}
    />
  </label>
);
Filter.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};
export default Filter;
