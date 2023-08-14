import { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { DataContext } from '../store/GlobalState'


const CollectionCards = () => {

  return (
    <div className="row">
      <div className="col-md-3">
        <div className="card-counter">
          <div className="card-block">
            <h6 className="mb-4">Today's Collection</h6>
            <div className="row d-flex align-items-center">
              <div className="col-9">
                <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-10"></i>$ 249.95</h3>
              </div>

              <div className="col-3 text-right">
                <p className="m-b-0">50%</p>
              </div>
            </div>
            <div className="progress m-t-30" style={{ height: '7px' }}>
              <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '50%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card-counter">
          <div className="card-block">
            <h6 className="mb-4">Last Week Collection</h6>
            <div className="row d-flex align-items-center">
              <div className="col-9">
                <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-10"></i>$ 249.95</h3>
              </div>

              <div className="col-3 text-right">
                <p className="m-b-0">70%</p>
              </div>
            </div>
            <div className="progress m-t-30" style={{ height: '7px' }}>
              <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '70%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card-counter">
          <div className="card-block">
            <h6 className="mb-4">Monthly Collection</h6>
            <div className="row d-flex align-items-center">
              <div className="col-9">
                <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-10"></i>$ 249.95</h3>
              </div>

              <div className="col-3 text-right">
                <p className="m-b-0">87%</p>
              </div>
            </div>
            <div className="progress m-t-30" style={{ height: '7px' }}>
              <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '87%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card-counter">
          <div className="card-block">
            <h6 className="mb-4">Yearly Collection</h6>
            <div className="row d-flex align-items-center">
              <div className="col-9">
                <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-10"></i>$ 249.95</h3>
              </div>

              <div className="col-3 text-right">
                <p className="m-b-0">67%</p>
              </div>
            </div>
            <div className="progress m-t-30" style={{ height: '7px' }}>
              <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '50%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default CollectionCards
