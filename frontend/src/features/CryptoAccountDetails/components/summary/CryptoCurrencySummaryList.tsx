import { useSelector } from 'react-redux';

import {
  getAllSummaryCryptoCurrency,
  getLoadingStatus
} from 'src/store/CryptoAccountDetails/summary/CryptoAccountDetailsSummarySlice'

import H3 from 'src/shared/components/Headers/H3';
import CryptoCurrencySummaryListElement from './CryptoCurrencySummaryListElement';
import CryptoCurrencySummaryListElementMobile from './CryptoCurrencySummaryListElementMobile';

import NotFound from 'src/shared/components/NotFound/NotFound';
import BaseTable from 'src/shared/components/Table/BaseTable';
import Loading from 'src/shared/components/Loading/Loading';

import { useScreen } from 'src/shared/hooks/useScreen';

import { Position } from 'src/shared/components/Headers/Header.types'
import { LoadingPosition } from 'src/shared/components/Loading/types';

const CryptoCurrencySummaryList = () => {
  const cryptoCurrency = useSelector(getAllSummaryCryptoCurrency);
  const loading = useSelector(getLoadingStatus)

  const { isMobileScreen } = useScreen();

  return (
    <div className="h-full my-4">
      <div className="flex flex-col gap-2 mt-4 h-full">
        <H3 position={Position.left}>
          Crypto Currency Summary
        </H3>
        {
          loading ? (
            <Loading position={LoadingPosition.start} />
          ) :  cryptoCurrency.length !== 0 ? (
            isMobileScreen() ? (
              cryptoCurrency.map((item) => (
                <CryptoCurrencySummaryListElementMobile 
                  item={item}
                />
              ))
            ) : (
              <BaseTable
                headers={['Coin Name', 'Avg Price', 'Amount', 'Current Price', 'Gain/Lost']}
                headerWidth={['1/2', '150px', '150px', '150px', '120px']}
              >
                {
                  cryptoCurrency.map((item) => (
                    <CryptoCurrencySummaryListElement
                      key={item.id}
                      item={item}
                    />
                  ))
                }
              </BaseTable>
            )
          ) : (
            <NotFound text={'No Crypto Currency Summary Found'} />
          )
        }
      </div>
    </div>
  )
}

export default CryptoCurrencySummaryList