import React from "react";

function AddService() {
   return (
      <div>
         <div className="auto-container">
            <div className="contact-title">
               <h2>Add a new employee</h2>
            </div>
            <div className="row clearfix">
               <div className="form-column col-lg-7">
                  <div className="inner-column">
                     <div className="contact-form">
                        <form onSubmit={handleSubmit}>
                           <div className="row clearfix">
                              <div className="form-group col-md-12">
                                 {serverError && (
                                    <div
                                       className="validation-error"
                                       role="alert"
                                    >
                                       {serverError}
                                    </div>
                                 )}
                                 <input
                                    type="email"
                                    name="employee_email"
                                    value={employee_email}
                                    onChange={(event) =>
                                       setEmail(event.target.value)
                                    }
                                    placeholder="Employee email"
                                 />
                                 {emailError && (
                                    <div
                                       className="validation-error"
                                       role="alert"
                                    >
                                       {emailError}
                                    </div>
                                 )}
                              </div>
                              <div className="form-group col-md-12">
                                 <input
                                    type="text"
                                    name="employee_first_name"
                                    value={employee_first_name}
                                    onChange={(event) =>
                                       setFirstName(event.target.value)
                                    }
                                    placeholder="Employee first name"
                                 />
                                 {firstNameRequired && (
                                    <div
                                       className="validation-error"
                                       role="alert"
                                    >
                                       {firstNameRequired}
                                    </div>
                                 )}
                              </div>

                              <div className="form-group col-md-12">
                                 <input
                                    type="text"
                                    name="employee_last_name"
                                    value={employee_last_name}
                                    onChange={(event) =>
                                       setLastName(event.target.value)
                                    }
                                    placeholder="Employee last name"
                                    required
                                 />
                              </div>

                              <div className="form-group col-md-12">
                                 <input
                                    type="text"
                                    name="employee_phone"
                                    value={employee_phone}
                                    onChange={(event) =>
                                       setPhoneNumber(event.target.value)
                                    }
                                    placeholder="Employee phone (555-555-5555)"
                                    required
                                 />
                              </div>

                              <div className="form-group col-md-12">
                                 <select
                                    name="employee_role"
                                    value={company_role_id}
                                    onChange={(event) =>
                                       setCompany_role_id(event.target.value)
                                    }
                                    className="custom-select-box"
                                 >
                                    <option value="1">Employee</option>
                                    <option value="2">Manager</option>
                                    <option value="3">Admin</option>
                                 </select>
                              </div>

                              <div className="form-group col-md-12">
                                 <input
                                    type="password"
                                    name="employee_password"
                                    value={employee_password}
                                    onChange={(event) =>
                                       setPassword(event.target.value)
                                    }
                                    placeholder="Employee password"
                                 />
                                 {passwordError && (
                                    <div
                                       className="validation-error"
                                       role="alert"
                                    >
                                       {passwordError}
                                    </div>
                                 )}
                              </div>

                              <div className="form-group col-md-12">
                                 <button
                                    className="theme-btn btn-style-one"
                                    type="submit"
                                    data-loading-text="Please wait..."
                                 >
                                    <span>Add employee</span>
                                 </button>
                              </div>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default AddService;
