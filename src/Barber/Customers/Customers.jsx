import React, { useEffect, useRef, useState } from 'react'
import "./Customers.css"
import { DeleteIcon, EmailIcon, LeftArrow, MessageIcon, Notificationicon, RightArrow, SearchIcon, Settingsicon } from '../../icons'
import Skeleton from 'react-loading-skeleton'
import { barberGetAllCustomerListAction } from "../../Redux/Barber/Actions/BarberCustomersAction"
import { useDispatch, useSelector } from 'react-redux'
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer'
import { useNavigate } from 'react-router-dom'
import api from '../../Redux/api/Api'
import { GET_BARBER_ALL_CUSTOMERLIST_SUCCESS } from '../../Redux/Barber/Constants/constants'
import toast from 'react-hot-toast'

const CustomerList = () => {

  const currentsalonId = useSelector(state => state.BarberLoggedInMiddleware.barberSalonId)
  const barberProfile = useSelector(state => state.BarberLoggedInMiddleware.entiredata)

  const dispatch = useDispatch()

  const CustomerListControllerRef = useRef(new AbortController());

  useEffect(() => {
    const controller = new AbortController();
    CustomerListControllerRef.current = controller;

    dispatch(barberGetAllCustomerListAction(currentsalonId, barberProfile?.user[0]?.isApproved, controller.signal));

    return () => {
      if (CustomerListControllerRef.current) {
        CustomerListControllerRef.current.abort();
      }
    };
  }, [dispatch, barberProfile]);

  const barberGetAllCustomerList = useSelector(state => state.barberGetAllCustomerList)

  const {
    loading: barberGetAllCustomerListLoading,
    resolve: barberGetAllCustomerListResolve,
    getAllCustomers: AllCustomerList,
    currentPage,
    totalPages,
  } = barberGetAllCustomerList

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

  const [search, setSearch] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  const searchCustomerhandler = async () => {
    setSearchLoading(true);
    try {
      const { data } = await api.get(`/api/customer/getAllCustomersForBarber?salonId=${currentsalonId}&name=${search}`);
      dispatch({
        type: GET_BARBER_ALL_CUSTOMERLIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.error('Error searching customers:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  // const [page, setPage] = useState(currentPage);

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (currentPage) {
      setPage(currentPage)
    }
  }, [currentPage])

  const [checkAllCustomers, setCheckAllCustomers] = useState(false);
  const [checkedCustomers, setCheckedCustomers] = useState({});
  const [checkedEmails, setCheckedEmails] = useState([]);
  const [checkMobileNumbers, setCheckMobileNumber] = useState([]);
  const [checkCustomerNames, setCheckCustomerNames] = useState([]);

  const paginationLeftHandler = async () => {
    if (page > 1) {
      try {
        const { data } = await api.get(`/api/customer/getAllCustomersForBarber?salonId=${currentsalonId}&page=${page - 1}`);
        dispatch({
          type: GET_BARBER_ALL_CUSTOMERLIST_SUCCESS,
          payload: data,
        });
        setPage(prevPage => prevPage - 1);
        setCheckAllCustomers(false)
      } catch (error) {
        console.error('Error fetching customers:', error);
        setCheckAllCustomers(false)
      }
    }
  };

  const paginationRightHandler = async () => {
    if (page < totalPages) {
      try {
        const { data } = await api.get(`/api/customer/getAllCustomersForBarber?salonId=${currentsalonId}&page=${page + 1}`);
        dispatch({
          type: GET_BARBER_ALL_CUSTOMERLIST_SUCCESS,
          payload: data,
        });
        setPage(prevPage => prevPage + 1);
        setCheckAllCustomers(false)
      } catch (error) {
        console.error('Error fetching customers:', error);
        setCheckAllCustomers(false)
      }
    }
  };

  const customerEmailCheckedHandler = (customer) => {
    const isChecked = !checkedCustomers[customer._id];
    setCheckedCustomers(prevState => ({
      ...prevState,
      [customer._id]: isChecked,
    }));

    if (isChecked) {
      setCheckedEmails(prevEmails => [...prevEmails, customer.email]);
      setCheckMobileNumber(prevMobileNumbers => [...prevMobileNumbers, Number(`${customer.mobileCountryCode}${customer.mobileNumber}`)]);
      setCheckCustomerNames(prevNames => [...prevNames, customer.name]);
      setCheckAllCustomers(false)
    } else {
      setCheckedEmails(prevEmails => prevEmails.filter(email => email !== customer.email));
      setCheckMobileNumber(prevMobileNumbers => prevMobileNumbers.filter(mobileNumber => mobileNumber !== Number(`${customer.mobileCountryCode}${customer.mobileNumber}`)));
      setCheckCustomerNames(prevNames => prevNames.filter(name => name !== customer.name));
      setCheckAllCustomers(false)
    }
  };

  const checkAllCustomersHandler = (e) => {
    setCheckAllCustomers((prev) => {
      if (!prev) {
        const customerEmails = AllCustomerList.map((c) => c.email);
        const customerMobileNumbers = AllCustomerList.map((c) => Number(`${c.mobileCountryCode}${c.mobileNumber}`));
        const customerNames = AllCustomerList.map((c) => c.name);
        const allCheckedCustomers = AllCustomerList.reduce((acc, customer) => {
          acc[customer._id] = true;
          return acc;
        }, {});
        setCheckedEmails(customerEmails);
        setCheckMobileNumber(customerMobileNumbers);
        setCheckCustomerNames(customerNames);
        setCheckedCustomers(allCheckedCustomers);
      } else {
        setCheckedEmails([]);
        setCheckMobileNumber([]);
        setCheckCustomerNames([]);
        setCheckedCustomers({});
      }

      return !prev;
    });
  };

  const navigate = useNavigate();

  const sendEmailNavigate = () => {
    if (checkedEmails.length > 0) {
      navigate('/barber-customer/send-email', { state: checkedEmails });
    } else {
      toast.error("Atleast one customer needed", {
        duration: 3000,
        style: {
          fontSize: "1.4rem",
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }

  };

  const sendMessageNavigate = () => {
    if (checkMobileNumbers.length > 0) {
      navigate('/barber-customer/send-message', {
        state: {
          checkMobileNumbers,
          checkCustomerNames,
        },
      });
    } else {
      toast.error("Atleast one customer needed", {
        duration: 3000,
        style: {
          fontSize: "1.4rem",
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }

  };

  return (
    <div className={`customer_wrapper ${darkmodeOn && "dark"}`}>
      <div>
        <p>Customer List</p>

        <div>
          <div className={`customer_search ${darkmodeOn && 'dark'}`}>
            <input
              type="text"
              placeholder='Search'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div
            className={`customer_send_btn ${darkmodeOn && 'dark'}`}
            style={{ background: 'var(--primary-bg-color3)', color: '#fff' }}
            onClick={searchCustomerhandler}
          >
            <div><SearchIcon /></div>
          </div>

          <div className={`customer_send_btn ${darkmodeOn && 'dark'}`}
            onClick={sendEmailNavigate}
          >
            <div><EmailIcon /></div>
          </div>

          <div className={`customer_send_btn ${darkmodeOn && 'dark'}`}
            onClick={sendMessageNavigate}
          >
            <div><MessageIcon /></div>
          </div>
        </div>

        {/* <div className='mobile_customer_search'><SearchIcon /></div> */}
      </div>

      <div className={`customer_content_wrapper ${darkmodeOn && 'dark'}`}>
        {barberGetAllCustomerListLoading || searchLoading ? (
          <div className='customer_content_body'>
            <Skeleton
              count={9}
              height={'6rem'}
              style={{ marginBottom: '1rem' }}
              baseColor={darkmodeOn ? 'var(--darkmode-loader-bg-color)' : 'var(--lightmode-loader-bg-color)'}
              highlightColor={darkmodeOn ? 'var(--darkmode-loader-highlight-color)' : 'var(--lightmode-loader-highlight-color)'}
            />
          </div>
        ) : !barberGetAllCustomerListLoading && barberGetAllCustomerListResolve && AllCustomerList?.length > 0 ? (
          <div className={`customer_content_body ${darkmodeOn && 'dark'}`}>
            <div>
              <input
                type="checkbox"
                style={{ accentColor: 'red', height: '1.8rem', width: '1.8rem' }}
                onChange={checkAllCustomersHandler}
                checked={checkAllCustomers}
              />
              <p>Name</p>
              <p>Email</p>
              <p>Gender</p>
              <p>Mobile Number</p>
            </div>

            {AllCustomerList.map((s) => (
              <div key={s._id}>
                <input
                  type="checkbox"
                  style={{ accentColor: 'red', height: '1.8rem', width: '1.8rem' }}
                  checked={checkedCustomers[s._id] || false}
                  onChange={() => customerEmailCheckedHandler(s)}
                />
                <p>{s.name}</p>
                <p>{s.email}</p>
                <p>{s.gender}</p>
                <p>{s.mobileNumber}</p>
              </div>
            ))}
          </div>
        ) : !barberGetAllCustomerListLoading && barberGetAllCustomerListResolve && AllCustomerList?.length === 0 ? (
          <div className={`customer_content_body_error ${darkmodeOn && 'dark'}`}>
            <p style={{ margin: '2rem' }}>Customers not available</p>
          </div>
        ) : (
          !barberGetAllCustomerListLoading && !barberGetAllCustomerListResolve && (
            <div className={`customer_content_body_error ${darkmodeOn && 'dark'}`}>
              <p style={{ margin: '2rem' }}>Customers not available</p>
            </div>
          )
        )}
      </div>

      <div className='customer_pagination_wrapper'>
        <div>
          <div onClick={paginationLeftHandler}><LeftArrow /></div>
          <div onClick={paginationRightHandler} disabled={page === totalPages}><RightArrow /></div>
        </div>
      </div>
    </div>
  )
}

export default CustomerList