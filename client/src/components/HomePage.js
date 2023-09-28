import React from 'react'

const HomePage = () => {
    return (
        <div>
            <section class="py-4" style={{ background: 'url("https://q9k6x7m8.stackpathcdn.com/assets/home/homepage/header/desktop-illustration-night-8a30863e0990a34b55cf882b1ee789d5e27dbbb286d9b7f90705322c67fe44f8.png") right / cover no-repeat, rgba(255,255,255,0)', padding: '0px 0px' }}>
                <div class="container-fluid" style={{ position: 'relative', height: '100%', width: '100%', padding: '0px', marginTop: '-24px', marginBottom: "-24px", filter: 'saturate(100%)', backdropFilter: 'blur(2px)' }}>
                    <div class="text-start p-4 p-lg-5" style={{ height: "400px" }}>
                        <p class="fw-bold text-primary mb-2" style={{ borderColor: "rgb(0,0,0)" }}><span style={{ color: "rgb(129, 91, 91)" }}>Proud to introduce</span></p>
                        <h1 class="fw-bold mb-4" style={{ color: "rgb(0,0,0)" }}>The Platform for Geeks,<br />to Learn &amp; Grow</h1><button class="btn btn-primary fs-5 me-2 py-2 px-4" type="button" style={{ borderRadius: "0px" }}>Join The Community</button>
                    </div>
                </div>
            </section>
            <section class="newsletter-subscribe py-4 py-xl-5" style={{ padding: "0px 0px;" }}>
                <div class="container">
                    <form class="d-flex justify-content-center flex-wrap" method="post">
                        <div class="d-flex d-sm-flex flex-row align-items-center align-items-sm-center mb-3" style={{ width: "50%", minWidth: "50%", borderRadius: '0px', display: "flex" }}><input class="form-control" type="email" name="email" placeholder="Search Projects" style={{ borderRadius: "0px" }} /></div>
                        <div class="mb-3"><button class="btn btn-primary ms-2 " type="submit" style={{ borderRadius: 0 }}>Search Projects</button></div>
                    </form>
                </div>
            </section>
            <div class="container py-4 py-xl-5">
                <div class="row mb-5">
                    <div class="col-md-8 col-xl-6 text-center mx-auto">
                        <h2>Latest Projects</h2>
                    </div>
                </div>
                <div class="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
                    <div class="col">
                        <div class="card"><img class="card-img-top w-100 d-block fit-cover" style={{ height: "200px" }} src="https://d112y698adiu2z.cloudfront.net/photos/production/software_thumbnail_photos/001/892/978/datas/medium.gif" />
                            <div class="card-body p-4">
                                <p class="text-primary card-text mb-0">Entertainment</p>
                                <h4 class="card-title">uDirect</h4>
                                <p class="card-text">The inspiration for uDirect came from MadLibs; a phrasal template word game that is known to be funny and entertaining.</p>
                                <div class="d-flex"><img class="rounded-circle flex-shrink-0 me-3 fit-cover" width="50" height="50" src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&amp;ext=jpg" />
                                    <div>
                                        <p class="fw-bold mb-0">Ajay Chauhan</p>
                                        <p class="text-muted mb-0">IIT Bombay</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card"><img class="card-img-top w-100 d-block fit-cover" style={{ height: "200px" }} src="https://i.ytimg.com/vi/p32-SGH-LHM/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGFIgZSgtMA8=&amp;rs=AOn4CLBR4Aguh_njtXPfm3Ozxq21odviLQ" />
                            <div class="card-body p-4">
                                <p class="text-primary card-text mb-0">Environment</p>
                                <h4 class="card-title">cleanup.ai</h4>
                                <p class="card-text">Our AI analyzes and instantly categorizes the object as garbage, recycling, or compost, with results tailored to your location's waste disposal laws.</p>
                                <div class="d-flex"><img class="rounded-circle flex-shrink-0 me-3 fit-cover" width="50" height="50" src="https://img.freepik.com/free-vector/3d-cartoon-young-woman-smiling-circle-frame-character-illustration-vector-design_40876-3100.jpg?size=626&amp;ext=jpg" />
                                    <div>
                                        <p class="fw-bold mb-0">Salonee Pathak</p>
                                        <p class="text-muted mb-0">COEP Pune</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card"><img class="card-img-top w-100 d-block fit-cover" style={{ height: "200px" }} src="https://d112y698adiu2z.cloudfront.net/photos/production/software_thumbnail_photos/002/598/454/datas/medium.gif" />
                            <div class="card-body p-4">
                                <p class="text-primary card-text mb-0">Transportation</p>
                                <h4 class="card-title">ARrive</h4>
                                <p class="card-text">An augmented reality that recognizes bus signs in real time and can overlay information about the bus schedules and locate the nearest bus stops.</p>
                                <div class="d-flex"><img class="rounded-circle flex-shrink-0 me-3 fit-cover" width="50" height="50" src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=626&amp;ext=jpg" />
                                    <div>
                                        <p class="fw-bold mb-0">John Smith</p>
                                        <p class="text-muted mb-0">MIT&nbsp;</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row text-center">
                    <div class="col" style={{ padding: "12px" }}><button class="btn btn-primary fs-5 me-2 py-2 px-4 rounded-0" type="button">View More</button></div>
                </div>
            </div>
        </div>
    )
}

export default HomePage