import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@material-ui/icons'
import Link from 'next/link'
import { useState } from 'react'
import { Country } from '../../types/types'
import styles from './CountriesTable.module.css'

enum ColumnValue {
  Name = 'name',
  Population = 'population',
  Area = 'area',
  Gini = 'gini',
}

enum Direction {
  Ascending = 'asc',
  Descending = 'desc',
}

type CountriesTableProps = {
  countries: Country[]
}

const CountriesTable = ({ countries }: CountriesTableProps) => {
  const [direction, setDirection] = useState<Direction>()
  const [value, setValue] = useState<ColumnValue>()

  const orderedCountries = orderBy(countries, value, direction)

  const switchDirection = () => {
    if (!direction) {
      setDirection(Direction.Descending)
    } else if (direction === Direction.Descending) {
      setDirection(Direction.Ascending)
    } else {
      setDirection(null)
    }
  }

  const setValueAndDirection = (value: ColumnValue) => {
    switchDirection()
    setValue(value)
  }

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.heading_flag}></div>

        <button className={styles.heading_name} onClick={() => setValueAndDirection(ColumnValue.Name)}>
          <div>Name</div>

          {value === ColumnValue.Name && <SortArrow direction={direction} />}
        </button>

        <button className={styles.heading_population} onClick={() => setValueAndDirection(ColumnValue.Population)}>
          <div>Population</div>

          {value === ColumnValue.Population && <SortArrow direction={direction} />}
        </button>

        <button className={styles.heading_area} onClick={() => setValueAndDirection(ColumnValue.Area)}>
          <div>
            Area (km<sup style={{ fontSize: '0.5rem' }}>2</sup>)
          </div>

          {value === ColumnValue.Area && <SortArrow direction={direction} />}
        </button>

        <button className={styles.heading_gini} onClick={() => setValueAndDirection(ColumnValue.Gini)}>
          <div>Gini</div>

          {value === ColumnValue.Gini && <SortArrow direction={direction} />}
        </button>
      </div>

      {orderedCountries.map((country) => (
        <Link href={`/country/${country.alpha3Code}`} key={country.name}>
          <div className={styles.row}>
            <div className={styles.flag}>
              <img src={country.flag} alt={country.name} />
            </div>
            <div className={styles.name}>{country.name}</div>

            <div className={styles.population}>{country.population}</div>

            <div className={styles.area}>{country.area || 0}</div>

            <div className={styles.gini}>{country.gini || 0} %</div>
          </div>
        </Link>
      ))}
    </div>
  )
}

const orderBy = (countries: Country[], value: ColumnValue, direction: Direction) => {
  if (direction === Direction.Ascending) {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1))
  }

  if (direction === Direction.Descending) {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1))
  }

  return countries
}

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>
  }

  if (direction === Direction.Descending) {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    )
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    )
  }
}

export default CountriesTable
