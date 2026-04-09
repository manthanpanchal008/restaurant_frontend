import React from 'react'

function Heros({title,name}) {
    return (
        <div>
            {/* Hero Start */}
            <div className="container-fluid bg-light py-6 my-6 mt-5">
                <div className="container text-center">
                    <h1 className="display-1 mb-4">{title}</h1>
                    <ol className="breadcrumb justify-content-center mb-0">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Pages</a></li>
                        <li className="breadcrumb-item text-dark" aria-current="page">{name}</li>
                    </ol>
                </div>
            </div>
            {/* Hero End */}

        </div>
    )
}

export default Heros
