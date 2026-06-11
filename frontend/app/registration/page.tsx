'use client';

import api from '@/lib/axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';

export default function Registration() {
    const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ 
    first_name: '', 
    last_name: '', 
    email: '', 
    password: '', 
    confirm_password: '' 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);

    if (formData.password !== formData.confirm_password) {
      alert('Passwords do not match');
    }

    const response = await api.post(
     "/register", {...formData}
     );

     const data = response.data;

     if(data.type == 'error'){
        alert(data.msg);
        setLoading(false);
        return;
     }

     localStorage.setItem('token', data.token);
     alert(data.msg);
     router.push('/');
  }

  return <section className="_social_registration_wrapper _layout_main_wrapper">
    <div className="_shape_one">
      <img src="/assets/images/shape1.svg" alt="" className="_shape_img"/>
      <img src="/assets/images/dark_shape.svg" alt="" className="_dark_shape"/>
    </div>
    <div className="_shape_two">
      <img src="/assets/images/shape2.svg" alt="" className="_shape_img"/>
      <img src="/assets/images/dark_shape1.svg" alt="" className="_dark_shape _dark_shape_opacity"/>
    </div>
    <div className="_shape_three">
      <img src="/assets/images/shape3.svg" alt="" className="_shape_img"/>
      <img src="/assets/images/dark_shape2.svg" alt="" className="_dark_shape _dark_shape_opacity"/>
    </div>
    <div className="_social_registration_wrap">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
            <div className="_social_registration_right">
              <div className="_social_registration_right_image">
                <img src="/assets/images/registration.png" alt="Image"/>
              </div>
              <div className="_social_registration_right_image_dark">
                <img src="/assets/images/registration1.png" alt="Image"/>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
            <div className="_social_registration_content">
              <div className="_social_registration_right_logo _mar_b28">
                <img src="/assets/images/logo.svg" alt="Image" className="_right_logo"/>
              </div>
              <p className="_social_registration_content_para _mar_b8">Get Started Now</p>
              <h4 className="_social_registration_content_title _titl4 _mar_b50">Registration</h4>
              <button type="button" className="_social_registration_content_btn _mar_b40">
                <img src="/assets/images/google.svg" alt="Image" className="_google_img"/> 
                <span>Register with google</span>
              </button>
              <div className="_social_registration_content_bottom_txt _mar_b40"> <span>Or</span>
              </div>
              <form className="_social_registration_form" onSubmit={submit}>
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_registration_form_input _mar_b14">
                      <label className="_social_registration_label _mar_b8">First Name</label>
                      <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} className="form-control _social_registration_input" required/>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_registration_form_input _mar_b14">
                      <label className="_social_registration_label _mar_b8">Last Name</label>
                      <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} className="form-control _social_registration_input" required/>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_registration_form_input _mar_b14">
                      <label className="_social_registration_label _mar_b8">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control _social_registration_input" required/>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_registration_form_input _mar_b14">
                      <label className="_social_registration_label _mar_b8">Password</label>
                      <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control _social_registration_input" required/>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_registration_form_input _mar_b14">
                      <label className="_social_registration_label _mar_b8">Repeat Password</label>
                      <input type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} className="form-control _social_registration_input" required/>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12">
                    <div className="form-check _social_registration_form_check">
                      <input className="form-check-input _social_registration_form_check_input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked/>
                      <label className="form-check-label _social_registration_form_check_label" htmlFor="flexRadioDefault2">I agree to terms & conditions</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                    <div className="_social_registration_form_btn _mar_t40 _mar_b60">
                      <button type="submit" className="_social_registration_form_btn_link _btn1" style={{ padding: '12px 70px' }} disabled={loading}>{loading ? 'Please Wait...' : 'Register Now'}</button>
                    </div>
                  </div>
                </div>
              </form>
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div className="_social_login_bottom_txt">
                    <p className="_social_login_bottom_txt_para">Have an account? <Link href="/">Login Account</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
}