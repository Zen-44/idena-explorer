import Link from 'next/link'
import {NavItem, NavLink, TabPane, TabContent} from 'reactstrap'
import {useQuery} from 'react-query'
import {useRouter} from 'next/router'
import Layout from '../../shared/components/layout'
import {getAddressInfo, getContract} from '../../shared/api'
import {dnaFmt, precise6} from '../../shared/utils/utils'
import Transfers from '../../screens/contract/components/transfers'

function Contract() {
  const router = useRouter()
  const address = router.query.address || ''

  const {data: addressInfo} = useQuery(
    address && ['balance', address],
    (_, address) => getAddressInfo(address)
  )

  const {data: contractInfo} = useQuery(
    address && ['contract', address],
    (_, address) => getContract(address)
  )

  return (
    <Layout title={`Smart contract ${address}`}>
      <section className="section section_main">
        <div className="row">
          <div className="col-auto">
            <div className="section_main__image">
              <img
                src={`https://robohash.org/${address.toLowerCase()}`}
                alt="pic"
                width="160"
              />
            </div>
          </div>
          <div className="col">
            <div className="section_main__group">
              <h1 className="section_main__title">
                <span>Smart contract</span>
              </h1>
              <h3 className="section_main__subtitle">{address}</h3>
            </div>

            <Link href="/address/[address]" as={`/address/${address}`}>
              <a className="btn btn-small btn-primary">
                <i className="icon icon--coins" />
                <span>Address details</span>
              </a>
            </Link>
          </div>
        </div>
      </section>

      <ContractData addressInfo={addressInfo} contractInfo={contractInfo} />

      <section className="section section_tabs">
        <div className="tabs">
          <div className="section__header">
            <div className="row align-items-center justify-content-between">
              <div className="col">
                <ul className="nav nav-tabs" role="tablist">
                  <NavItem>
                    <NavLink active>
                      <h3>Smart contract's transfers</h3>
                    </NavLink>
                  </NavItem>
                </ul>
              </div>
            </div>
          </div>

          <TabContent activeTab="transfers">
            <TabPane tabId="transfers">
              <div className="card">
                {contractInfo && <Transfers address={address} />}
              </div>
            </TabPane>
          </TabContent>
        </div>
      </section>
    </Layout>
  )
}

function ContractData({addressInfo, contractInfo}) {
  return (
    <>
      <section className="section section_details">
        <h3>Details</h3>
        <div className="card">
          <div className="row">
            <div className="col-12 col-sm-6">
              <div className="section__group">
                <div className="control-label">Type:</div>
                <div className="text_block">
                  {(contractInfo && contractInfo.type) || '-'}
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="section__group">
                <div className="control-label">Balance:</div>
                <div className="text_block">
                  {(addressInfo && dnaFmt(precise6(addressInfo.balance))) ||
                    '-'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contract