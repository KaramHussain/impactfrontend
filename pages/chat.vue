<template>
  <main>
    <impact-header />
    <impact-sidebar />
    <div class="app-content content chat-application">
      <div class="sidebar-left">
        <div class="sidebar">
          <!-- app chat user profile left sidebar start -->
          <div class="chat-user-profile">
            <header class="chat-user-profile-header text-center border-bottom">
              <span class="chat-profile-close">
                <i class="ft-x"></i>
              </span>
              <div class="my-2">
                <img
                  src=""
                  class="round mb-1"
                  alt="user_avatar"
                  height="100"
                  width="100"
                />
                <h5 class="mb-0">John Doe</h5>
                <span>Designer</span>
              </div>
            </header>
            <div class="chat-user-profile-content">
              <div class="chat-user-profile-scroll">
                <h6 class="text-uppercase mb-1">ABOUT</h6>
                <p class="mb-2">
                  It is a long established fact that a reader will be distracted
                  by the readable content .
                </p>
                <h6>PERSONAL INFORAMTION</h6>
                <ul class="list-unstyled mb-2">
                  <li class="mb-25">email@gmail.com</li>
                  <li>+1(789) 950 -7654</li>
                </ul>
                <h6 class="text-uppercase mb-1">CHANNELS</h6>
                <ul class="list-unstyled mb-2">
                  <li><a href="javascript:void(0);"># Devlopers</a></li>
                  <li><a href="javascript:void(0);"># Designers</a></li>
                </ul>
                <h6 class="text-uppercase mb-1">SETTINGS</h6>
                <ul class="list-unstyled">
                  <li class="mb-50 ">
                    <a
                      href="javascript:void(0);"
                      class="d-flex align-items-center"
                      ><i class="ft-tag mr-50"></i> Add Tag</a
                    >
                  </li>
                  <li class="mb-50 ">
                    <a
                      href="javascript:void(0);"
                      class="d-flex align-items-center"
                      ><i class="ft-star mr-50"></i> Important Contact</a
                    >
                  </li>
                  <li class="mb-50 ">
                    <a
                      href="javascript:void(0);"
                      class="d-flex align-items-center"
                      ><i class="ft-image mr-50"></i> Shared Documents</a
                    >
                  </li>
                  <li class="mb-50 ">
                    <a
                      href="javascript:void(0);"
                      class="d-flex align-items-center"
                      ><i class="ft-trash-2 mr-50"></i> Deleted Documents</a
                    >
                  </li>
                  <li>
                    <a
                      href="javascript:void(0);"
                      class="d-flex align-items-center"
                      ><i class="ft-x-circle mr-50"></i> Blocked Contact</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- app chat user profile left sidebar ends -->
          <!-- app chat sidebar start -->
          <div class="chat-sidebar card">
            <span class="chat-sidebar-close">
              <i class="ft-x"></i>
            </span>
            <div class="chat-sidebar-search">
              <div class="d-flex align-items-center">
                <div class="chat-sidebar-profile-toggle">
                  <div class="avatar">
                    <img
                      src=""
                      class="cursor-pointer"
                      alt="user_avatar"
                      height="36"
                      width="36"
                    />
                  </div>
                </div>
                <fieldset
                  class="form-group position-relative has-icon-left mx-75 mb-0"
                >
                  <input
                    type="text"
                    class="form-control round"
                    id="chat-search"
                    placeholder="Search"
                  />
                  <div class="form-control-position">
                    <i class="ft-search text-dark"></i>
                  </div>
                </fieldset>
              </div>
            </div>
            <div class="chat-sidebar-list-wrapper pt-2">
              <h6 class="px-2 pb-25 mb-0">
                CHANNELS<i class="ft-plus float-right cursor-pointer"></i>
              </h6>
              <ul class="chat-sidebar-list">
                <li>
                  <h6 class="mb-0"># Devlopers</h6>
                </li>
                <li>
                  <h6 class="mb-0"># Designers</h6>
                </li>
              </ul>
              <h6 class="px-2 pt-2 pb-25 mb-0">CHATS</h6>
              <ul class="chat-sidebar-list">
                <li>
                  <div class="d-flex align-items-center">
                    <div class="avatar m-0 mr-50">
                      <img
                        src=""
                        height="36"
                        width="36"
                        alt="sidebar user image"
                      />
                      <span class="avatar-status-busy"></span>
                    </div>
                    <div class="chat-sidebar-name">
                      <h6 class="mb-0">Elizabeth Elliott</h6>
                      <span class="text-muted">Cake pie</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="d-flex align-items-center">
                    <div class="avatar m-0 mr-50">
                      <img
                        src=""
                        height="36"
                        width="36"
                        alt="sidebar user image"
                      />
                      <span class="avatar-status-online"></span>
                    </div>
                    <div class="chat-sidebar-name">
                      <h6 class="mb-0">Kristopher Candy</h6>
                      <span class="text-muted">jelly jelly</span>
                    </div>
                  </div>
                </li>
              </ul>
              <h6 class="px-2 pt-2 pb-25 mb-0">
                CONTACTS<i class="ft-plus float-right cursor-pointer"></i>
              </h6>
              <ul class="chat-sidebar-list">
                <li>
                  <div class="d-flex align-items-center">
                    <div class="avatar m-0 mr-50">
                      <img
                        src=""
                        height="36"
                        width="36"
                        alt="sidebar user image"
                      />
                      <span class="avatar-status-away"></span>
                    </div>
                    <div class="chat-sidebar-name">
                      <h6 class="mb-0">Sarah Woods</h6>
                      <span class="text-muted"> lemon drops</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="d-flex align-items-center">
                    <div class="avatar bg-info m-0 mr-50">
                      <span class="avatar-content">JP</span>
                      <span class="avatar-status-offline"></span>
                    </div>
                    <div class="chat-sidebar-name">
                      <h6 class="mb-0">Jenny Perich</h6>
                      <span class="text-muted">candy canes.</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="d-flex align-items-center">
                    <div class="avatar m-0 mr-50">
                      <img
                        src=""
                        height="36"
                        width="36"
                        alt="sidebar user image"
                      />
                      <span class="avatar-status-online"></span>
                    </div>
                    <div class="chat-sidebar-name">
                      <h6 class="mb-0">Rock Montgomery</h6>
                      <span class="text-muted">powder gum</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="d-flex align-items-center">
                    <div class="avatar m-0 mr-50">
                      <img
                        src=""
                        height="36"
                        width="36"
                        alt="sidebar user image"
                      />
                      <span class="avatar-status-busy"></span>
                    </div>
                    <div class="chat-sidebar-name">
                      <h6 class="mb-0">Heather Howell</h6>
                      <span class="text-muted">cheesecake toffee</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="d-flex align-items-center">
                    <div class="avatar m-0 mr-50 bg-success">
                      <span class="avatar-content">KR</span>
                      <span class="avatar-status-offline"></span>
                    </div>
                    <div class="chat-sidebar-name">
                      <h6 class="mb-0">Kelly Reyes</h6>
                      <span class="text-muted">gingerbread</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="d-flex align-items-center">
                    <div class="avatar m-0 mr-50">
                      <img
                        src=""
                        height="36"
                        width="36"
                        alt="sidebar user image"
                      />
                      <span class="avatar-status-online"></span>
                    </div>
                    <div class="chat-sidebar-name">
                      <h6 class="mb-0">Vince Nelson</h6>
                      <span class="text-muted">Puddingdrops</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="d-flex align-items-center">
                    <div class="avatar m-0 mr-50">
                      <img
                        src=""
                        height="36"
                        width="36"
                        alt="sidebar user image"
                      />
                      <span class="avatar-status-offline"></span>
                    </div>
                    <div class="chat-sidebar-name">
                      <h6 class="mb-0">Drake Elliott</h6>
                      <span class="text-muted">jelly helloi</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="d-flex align-items-center">
                    <div class="avatar m-0 mr-50">
                      <img
                        src=""
                        height="36"
                        width="36"
                        alt="sidebar user image"
                      />
                      <span class="avatar-status-online"></span>
                    </div>
                    <div class="chat-sidebar-name">
                      <h6 class="mb-0">Kristopher Candy</h6>
                      <span class="text-muted">jujubes</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!-- app chat sidebar ends -->
        </div>
      </div>
      <div class="content-right">
        <div class="content-overlay"></div>
        <div class="content-wrapper chat-wrapper">
          <div class="content-header row"></div>
          <div class="content-body">
            <!-- app chat overlay -->
            <div class="chat-overlay"></div>
            <!-- app chat window start -->
            <section class="chat-window-wrapper">
              <div class="chat-start">
                <span
                  class="ft-message-square chat-sidebar-toggle chat-start-icon font-large-3 p-3 mb-1"
                ></span>
                <h4 class="d-none d-lg-block py-50 text-bold-500">
                  Select a contact to start a chat!
                </h4>
                <button
                  class="btn btn-light-primary chat-start-text chat-sidebar-toggle d-block d-lg-none py-50 px-1"
                >
                  Start Conversation!
                </button>
              </div>
              <div class="chat-area d-none">
                <div class="chat-header">
                  <header
                    class="d-flex justify-content-between align-items-center px-1 py-75"
                  >
                    <div class="d-flex align-items-center">
                      <div class="chat-sidebar-toggle d-block d-lg-none mr-1">
                        <i
                          class="ft-align-justify font-large-1 cursor-pointer"
                        ></i>
                      </div>
                      <div class="avatar chat-profile-toggle m-0 mr-1">
                        <img
                          src=""
                          class="cursor-pointer"
                          alt="avatar"
                          height="36"
                          width="36"
                        />
                        <span class="avatar-status-busy"></span>
                      </div>
                      <h6 class="mb-0">Elizabeth Elliott</h6>
                    </div>
                    <div class="chat-header-icons">
                      <span class="chat-icon-favorite">
                        <i class="ft-star font-medium-5 cursor-pointer"></i>
                      </span>
                      <span class="dropdown">
                        <i
                          class="ft-more-vertical font-medium-4 ml-25 cursor-pointer dropdown-toggle nav-hide-arrow cursor-pointer"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          role="menu"
                        >
                        </i>
                        <span
                          class="dropdown-menu dropdown-menu-right"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <a class="dropdown-item" href="JavaScript:void(0);"
                            ><i class="ft-tag mr-25"></i> Pin to top</a
                          >
                          <a class="dropdown-item" href="JavaScript:void(0);"
                            ><i class="ft-trash-2 mr-25"></i> Delete chat</a
                          >
                          <a class="dropdown-item" href="JavaScript:void(0);"
                            ><i class="ft-x-circle mr-25"></i> Block</a
                          >
                        </span>
                      </span>
                    </div>
                  </header>
                </div>
                <!-- chat card start -->
                <div class="card chat-wrapper shadow-none mb-0">
                  <div class="card-content">
                    <div class="card-body chat-container">
                      <div class="chat-content">
                        <div class="chat">
                          <div class="chat-avatar">
                            <a class="avatar m-0">
                              <img src="" alt="avatar" height="36" width="36" />
                            </a>
                          </div>
                          <div class="chat-body">
                            <div class="chat-message">
                              <p>How can we help? We're here for you! 😄</p>
                              <span class="chat-time">7:45 AM</span>
                            </div>
                          </div>
                        </div>
                        <div class="chat chat-left">
                          <div class="chat-avatar">
                            <a class="avatar m-0">
                              <img src="" alt="avatar" height="36" width="36" />
                            </a>
                          </div>
                          <div class="chat-body">
                            <div class="chat-message">
                              <p>
                                Hey John, I am looking for the best admin
                                template.
                              </p>
                              <p>Could you please help me to find it out? 🤔</p>
                              <span class="chat-time">7:50 AM</span>
                            </div>
                            <div class="chat-message">
                              <p>It should be Bootstrap 4 🤩 compatible.</p>
                              <span class="chat-time">7:58 AM</span>
                            </div>
                          </div>
                        </div>
                        <div
                          class="badge badge-pill badge-light-secondary my-1"
                        >
                          Yesterday
                        </div>
                        <div class="chat">
                          <div class="chat-avatar">
                            <a class="avatar m-0">
                              <img src="" alt="avatar" height="36" width="36" />
                            </a>
                          </div>
                          <div class="chat-body">
                            <div class="chat-message">
                              <p>Absolutely!</p>
                              <span class="chat-time">8:00 AM</span>
                            </div>
                            <div class="chat-message">
                              <p>
                                modern admin is the responsive bootstrap 4 admin
                                template.
                              </p>
                              <span class="chat-time">8:01 AM</span>
                            </div>
                          </div>
                        </div>
                        <div class="chat chat-left">
                          <div class="chat-avatar">
                            <a class="avatar m-0">
                              <img src="" alt="avatar" height="36" width="36" />
                            </a>
                          </div>
                          <div class="chat-body">
                            <div class="chat-message">
                              <p>Looks clean and fresh UI. 😃</p>
                              <span class="chat-time">10:12 AM</span>
                            </div>
                            <div class="chat-message">
                              <p>It's perfect for my next project.</p>
                              <span class="chat-time">10:15 AM</span>
                            </div>
                            <div class="chat-message">
                              <p>How can I purchase 🤑 it?</p>
                              <span class="chat-time">10:18 AM</span>
                            </div>
                          </div>
                        </div>
                        <div class="chat">
                          <div class="chat-avatar">
                            <a class="avatar m-0">
                              <img src="" alt="avatar" height="36" width="36" />
                            </a>
                          </div>
                          <div class="chat-body">
                            <div class="chat-message">
                              <p>Thanks 🤝 , from ThemeForest.</p>
                              <span class="chat-time">10:20 AM</span>
                            </div>
                          </div>
                        </div>
                        <div class="chat chat-left">
                          <div class="chat-avatar">
                            <a class="avatar m-0">
                              <img src="" alt="avatar" height="36" width="36" />
                            </a>
                          </div>
                          <div class="chat-body">
                            <div class="chat-message">
                              <p>I will purchase it for sure. 👍</p>
                              <span class="chat-time">3:32 PM</span>
                            </div>
                            <div class="chat-message">
                              <p>Thanks.</p>
                              <span class="chat-time">3:33 PM</span>
                            </div>
                          </div>
                        </div>
                        <div class="chat">
                          <div class="chat-avatar">
                            <a class="avatar m-0">
                              <img src="" alt="avatar" height="36" width="36" />
                            </a>
                          </div>
                          <div class="chat-body">
                            <div class="chat-message">
                              <p>Great, Feel free to get in touch on</p>
                              <span class="chat-time">3:34 AM</span>
                            </div>
                            <div class="chat-message">
                              <p>https://pixinvent.ticksy.com/</p>
                              <span class="chat-time">3:35 AM</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer chat-footer px-2 py-1 pb-0">
                    <form
                      class="d-flex align-items-center"
                      onsubmit="chatMessagesSend();"
                      action="javascript:void(0);"
                    >
                      <i class="ft-user cursor-pointer"></i>
                      <i class="ft-paperclip ml-1 cursor-pointer"></i>
                      <input
                        type="text"
                        class="form-control chat-message-send mx-1"
                        placeholder="Type your message here..."
                      />
                      <button
                        type="submit"
                        class="btn btn-primary glow send d-lg-flex"
                      >
                        <i class="ft-play"></i>
                        <span class="d-none d-lg-block mx-50">Send</span>
                      </button>
                    </form>
                  </div>
                </div>
                <!-- chat card ends -->
              </div>
            </section>
            <!-- app chat window ends -->
            <!-- app chat profile right sidebar start -->
            <section class="chat-profile">
              <header class="chat-profile-header text-center border-bottom">
                <span class="chat-profile-close">
                  <i class="ft-x"></i>
                </span>
                <div class="my-2">
                  <img
                    src=""
                    class="round mb-1"
                    alt="chat avatar"
                    height="100"
                    width="100"
                  />

                  <h5 class="app-chat-user-name mb-0">Elizabeth Elliott</h5>
                  <span>Devloper</span>
                </div>
              </header>
              <div class="chat-profile-content p-2">
                <h6 class="mt-1">ABOUT</h6>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content.
                </p>
                <h6 class="mt-2">PERSONAL INFORMATION</h6>
                <ul class="list-unstyled">
                  <li class="mb-25">email@gmail.com</li>
                  <li>+1(789) 950-7654</li>
                </ul>
              </div>
            </section>
            <!-- app chat profile right sidebar ends -->
          </div>
        </div>
      </div>
    </div>

    <div class="sidenav-overlay"></div>
    <div class="drag-target"></div>

    <impact-footer />
  </main>
</template>

<script>
import impactHeader from "@/components/layouts/impact-header";
import impactFooter from "@/components/layouts/impact-footer";
import impactSidebar from "@/components/layouts/impact-sidebar";

export default {
  middleware: ["auth"],

  components: {
    impactHeader,
    impactFooter,
    impactSidebar
  },

  head() {
    return {
      title: "Chat",
      link: [{ href: "/app-assets/css/pages/app-chat.css", rel: "stylesheet" }],
      script: [
        {
          src: "/app-assets/js/scripts/pages/app-chat.js",
          body: true,
          async: false,
          defer: true
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
html {
  .fixed-navbar {
    padding-top: 0 !important;
  }
  .content {
    .chat-wrapper {
      padding: 0 !important;
    }
  }
}
</style>
