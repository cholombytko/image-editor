'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-750df5fae7b89183a67043a1dd1ecb52b9a24e236016bc2373954fbf826dce2d6f0e0077828573ddb5246d614dc345bd59ab24f25713dd2a1f35a0043c61ab51"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-750df5fae7b89183a67043a1dd1ecb52b9a24e236016bc2373954fbf826dce2d6f0e0077828573ddb5246d614dc345bd59ab24f25713dd2a1f35a0043c61ab51"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-750df5fae7b89183a67043a1dd1ecb52b9a24e236016bc2373954fbf826dce2d6f0e0077828573ddb5246d614dc345bd59ab24f25713dd2a1f35a0043c61ab51"' :
                                            'id="xs-controllers-links-module-AuthModule-750df5fae7b89183a67043a1dd1ecb52b9a24e236016bc2373954fbf826dce2d6f0e0077828573ddb5246d614dc345bd59ab24f25713dd2a1f35a0043c61ab51"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-750df5fae7b89183a67043a1dd1ecb52b9a24e236016bc2373954fbf826dce2d6f0e0077828573ddb5246d614dc345bd59ab24f25713dd2a1f35a0043c61ab51"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-750df5fae7b89183a67043a1dd1ecb52b9a24e236016bc2373954fbf826dce2d6f0e0077828573ddb5246d614dc345bd59ab24f25713dd2a1f35a0043c61ab51"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-750df5fae7b89183a67043a1dd1ecb52b9a24e236016bc2373954fbf826dce2d6f0e0077828573ddb5246d614dc345bd59ab24f25713dd2a1f35a0043c61ab51"' :
                                        'id="xs-injectables-links-module-AuthModule-750df5fae7b89183a67043a1dd1ecb52b9a24e236016bc2373954fbf826dce2d6f0e0077828573ddb5246d614dc345bd59ab24f25713dd2a1f35a0043c61ab51"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PasswordService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PasswordService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ImagesModule.html" data-type="entity-link" >ImagesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ImagesModule-5916dea5dc16ac7c3620b908d081f4b5bc41212034646b4fc5d480067a9a146864712470172660302f762a16e93259d26027b0ae6646d0b1c0d2320149ff3d29"' : 'data-bs-target="#xs-injectables-links-module-ImagesModule-5916dea5dc16ac7c3620b908d081f4b5bc41212034646b4fc5d480067a9a146864712470172660302f762a16e93259d26027b0ae6646d0b1c0d2320149ff3d29"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ImagesModule-5916dea5dc16ac7c3620b908d081f4b5bc41212034646b4fc5d480067a9a146864712470172660302f762a16e93259d26027b0ae6646d0b1c0d2320149ff3d29"' :
                                        'id="xs-injectables-links-module-ImagesModule-5916dea5dc16ac7c3620b908d081f4b5bc41212034646b4fc5d480067a9a146864712470172660302f762a16e93259d26027b0ae6646d0b1c0d2320149ff3d29"' }>
                                        <li class="link">
                                            <a href="injectables/ImagesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ImagesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProjectModule.html" data-type="entity-link" >ProjectModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProjectModule-9ca2611f42268f67c13ac88ee643872dda28daecdc9bfaae73d2c7ff9d16ef8ad2b3e9f76f6734322264b0531a8889acfb108b1fbbac674636366f9615f04aa7"' : 'data-bs-target="#xs-controllers-links-module-ProjectModule-9ca2611f42268f67c13ac88ee643872dda28daecdc9bfaae73d2c7ff9d16ef8ad2b3e9f76f6734322264b0531a8889acfb108b1fbbac674636366f9615f04aa7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProjectModule-9ca2611f42268f67c13ac88ee643872dda28daecdc9bfaae73d2c7ff9d16ef8ad2b3e9f76f6734322264b0531a8889acfb108b1fbbac674636366f9615f04aa7"' :
                                            'id="xs-controllers-links-module-ProjectModule-9ca2611f42268f67c13ac88ee643872dda28daecdc9bfaae73d2c7ff9d16ef8ad2b3e9f76f6734322264b0531a8889acfb108b1fbbac674636366f9615f04aa7"' }>
                                            <li class="link">
                                                <a href="controllers/ProjectController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProjectController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProjectModule-9ca2611f42268f67c13ac88ee643872dda28daecdc9bfaae73d2c7ff9d16ef8ad2b3e9f76f6734322264b0531a8889acfb108b1fbbac674636366f9615f04aa7"' : 'data-bs-target="#xs-injectables-links-module-ProjectModule-9ca2611f42268f67c13ac88ee643872dda28daecdc9bfaae73d2c7ff9d16ef8ad2b3e9f76f6734322264b0531a8889acfb108b1fbbac674636366f9615f04aa7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProjectModule-9ca2611f42268f67c13ac88ee643872dda28daecdc9bfaae73d2c7ff9d16ef8ad2b3e9f76f6734322264b0531a8889acfb108b1fbbac674636366f9615f04aa7"' :
                                        'id="xs-injectables-links-module-ProjectModule-9ca2611f42268f67c13ac88ee643872dda28daecdc9bfaae73d2c7ff9d16ef8ad2b3e9f76f6734322264b0531a8889acfb108b1fbbac674636366f9615f04aa7"' }>
                                        <li class="link">
                                            <a href="injectables/ProjectService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProjectService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-f8de14d4d3bcea1e723da0aa365bf1a9cc7ad8f131ee7214889ed69bfe06f4a0bff24b8d9dc2929ebb7ce6ab1fbcc8ab6c7183bb3e042eaf336b1b2ede78f890"' : 'data-bs-target="#xs-injectables-links-module-UserModule-f8de14d4d3bcea1e723da0aa365bf1a9cc7ad8f131ee7214889ed69bfe06f4a0bff24b8d9dc2929ebb7ce6ab1fbcc8ab6c7183bb3e042eaf336b1b2ede78f890"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-f8de14d4d3bcea1e723da0aa365bf1a9cc7ad8f131ee7214889ed69bfe06f4a0bff24b8d9dc2929ebb7ce6ab1fbcc8ab6c7183bb3e042eaf336b1b2ede78f890"' :
                                        'id="xs-injectables-links-module-UserModule-f8de14d4d3bcea1e723da0aa365bf1a9cc7ad8f131ee7214889ed69bfe06f4a0bff24b8d9dc2929ebb7ce6ab1fbcc8ab6c7183bb3e042eaf336b1b2ede78f890"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Image.html" data-type="entity-link" >Image</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Project.html" data-type="entity-link" >Project</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AuthTokenNotFoundException.html" data-type="entity-link" >AuthTokenNotFoundException</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateImageDto.html" data-type="entity-link" >CreateImageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProjectDto.html" data-type="entity-link" >CreateProjectDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindByUserIdDto.html" data-type="entity-link" >FindByUserIdDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/IncorrectPasswordException.html" data-type="entity-link" >IncorrectPasswordException</a>
                            </li>
                            <li class="link">
                                <a href="classes/InvalidTokenException.html" data-type="entity-link" >InvalidTokenException</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInDto.html" data-type="entity-link" >SignInDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignUpDto.html" data-type="entity-link" >SignUpDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateImageDto.html" data-type="entity-link" >UpdateImageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProjectDto.html" data-type="entity-link" >UpdateProjectDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserAlreadyExistsException.html" data-type="entity-link" >UserAlreadyExistsException</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserNotFoundException.html" data-type="entity-link" >UserNotFoundException</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IAuthData.html" data-type="entity-link" >IAuthData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAuthResponse.html" data-type="entity-link" >IAuthResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateImage.html" data-type="entity-link" >ICreateImage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateProject.html" data-type="entity-link" >ICreateProject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateUser.html" data-type="entity-link" >ICreateUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFindUser.html" data-type="entity-link" >IFindUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUpdateProject.html" data-type="entity-link" >IUpdateProject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});