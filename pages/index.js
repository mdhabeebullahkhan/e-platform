import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'

import { getData } from '../utils/fetchData'
import filterSearch from '../utils/filterSearch'
import { useRouter } from 'next/router'
import Filter from '../components/Filter'
import CollectionCards from '../components/CollectionCards'

import Signin from './signin'

import FeeModule from '../components/FeeModule/FeeModule'
import StudentModule from '../components/StudentModule/StudentModule'
import TeacherModule from '../components/TeacherModule/TeacherModule'
import ReportGeneration from '../components/ReportGeneration/ReportGeneration'
import ClassGeneration from '../components/ClassGeneration/ClassGeneration'
import SchoolRegistration from '../components/SchoolRegistration/SchoolRegistration'
const Home = () => {
  
  // const [isCheck, setIsCheck] = useState(false)
  // const [page, setPage] = useState(1)
  // const router = useRouter()

  const { state, dispatch } = useContext(DataContext)
  const { auth } = state

  useEffect(() => {
   
  }, [])

  // useEffect(() => {
  //   if (Object.keys(router.query).length === 0) setPage(1)
  // }, [router.query])

  // const handleCheck = (id) => {
  //   products.forEach(product => {
  //     if (product._id === id) product.checked = !product.checked
  //   })
  //   setProducts([...products])
  // }

  // const handleCheckALL = () => {
  //   products.forEach(product => product.checked = !isCheck)
  //   setProducts([...products])
  //   setIsCheck(!isCheck)
  // }

  // const handleDeleteAll = () => {
  //   let deleteArr = [];
  //   products.forEach(product => {
  //     if (product.checked) {
  //       deleteArr.push({
  //         data: '',
  //         id: product._id,
  //         title: 'Delete all selected products?',
  //         type: 'DELETE_PRODUCT'
  //       })
  //     }
  //   })

  //   dispatch({ type: 'ADD_MODAL', payload: deleteArr })
  // }

  // const handleLoadmore = () => {
  //   setPage(page + 1)
  //   filterSearch({ router, page: page + 1 }, '/', false)
  // }

 



  return (
    <div className="home_page">
      <Head>
        <title>SMS - Home</title>
      </Head>

      {
        auth.user && auth.user.role === 'admin' || auth.user && auth.user.role === 'user' || auth.user && auth.user.role === 'student' ?
          <div>
            <div className="carousel image img-fluid" style={{marginTop:'3%'}}>
            {auth.user && auth.user.role === 'admin' ? <CollectionCards /> : ''}
            </div>
            {/* <div className="container-fluid p-0"><Filter state={state} /></div> */}
            <div className="products">
              {auth.user && auth.user.role === 'admin' || auth.user && auth.user.role === 'feecollector' ? <FeeModule /> : ''}
              {auth.user && auth.user.role === 'admin' || auth.user && auth.user.role === 'student' || auth.user && auth.user.role === 'teacher' ? <StudentModule /> : ''}
              {auth.user && auth.user.role === 'admin' || auth.user && auth.user.role === 'teacher' ? <TeacherModule /> : ''}
              {auth.user && auth.user.role === 'admin' || auth.user && auth.user.role === 'teacher' ? <ReportGeneration /> : ''}
              {auth.user && auth.user.role === 'admin' ? <ClassGeneration /> : ''}
              {auth.user && auth.user.role === 'admin' ? <SchoolRegistration /> : ''}
            </div>
            </div> : <Signin />}
    </div>
  )
}


// export async function getServerSideProps({ query }) {
//   const page = query.page || 1
//   const category = query.category || 'all'
//   const sort = query.sort || ''
//   const search = query.search || 'all'

//   const res = await getData(
//     // `product?limit=${page * 6}&category=${category}&sort=${sort}&title=${search}`
//   )

//   const bestSellingProds = await getData(
//     `product?limit=5&category=all&sort=-sold&title=`
//   )

//   // server side rendering
//   return {
//     props: {
//       // products: res.products,
//       // result: res.result,
//       // bestSellingProds: bestSellingProds.products
//     }, // will be passed to the page component as props
//   }
// }

export default Home