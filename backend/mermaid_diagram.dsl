
classDiagram

class AppModule{
            
            
        }
class DatabaseModule{
            
            
        }
class AuthController{
            -authService: AuthService
            +signUp() Promise~{ access_token: string; }~
+signIn() Promise~{ access_token: string; }~
        }
class AuthModule{
            
            
        }
class ImagesModule{
            
            
        }
class ImagesService{
            -imageRepository: Repository~Image~
            +create() Promise~Image~
+findOneById() Promise~Image~
+update() Promise~Image~
+removeById() Promise~void~
        }
class ProjectController{
            -projectService: ProjectService
            +create() Promise~Project~
+findAll() Promise~Project[]~
+findOne() Promise~Project~
+update() Promise~Project~
+remove() Promise~void~
        }
class ProjectModule{
            
            
        }
class ProjectService{
            -projectRepository: Repository~Project~
-userService: UserService
-imageService: ImagesService
            +create() Promise~Project~
+findAllByUserId() Promise~Project[]~
+findOneById() Promise~Project~
+update() Promise~Project~
+remove() Promise~void~
        }
class UserModule{
            
            
        }
class UserService{
            -userRepository: Repository~User~
            +create() Promise~User~
+findOne() Promise~IUser~
        }
class SignInDto{
            +password: string
+email: string
            
        }
class SignUpDto{
            +name: string
+password: string
+email: string
            
        }
class IncorrectPasswordException{
            
            
        }
UnauthorizedException<|--IncorrectPasswordException
class InvalidTokenException{
            
            
        }
UnauthorizedException<|--InvalidTokenException
class AuthTokenNotFoundException{
            
            
        }
UnauthorizedException<|--AuthTokenNotFoundException
class UserAlreadyExistsException{
            
            
        }
BadRequestException<|--UserAlreadyExistsException
class UserNotFoundException{
            
            
        }
BadRequestException<|--UserNotFoundException
class AuthGuard{
            -jwtService: JwtService
-userService: UserService
            +canActivate() Promise~boolean~
-extractTokenFromHeader() string
        }
CanActivate<|..AuthGuard
class IAuthData {
            <<interface>>
            +name?: string
+email: string
+password: string
            
        }
class IAuthResponse {
            <<interface>>
            +access_token: string
+userId: number
            
        }
class AuthService{
            -jwtService: JwtService
-passwordService: PasswordService
-userService: UserService
            +signUp() Promise~IAuthResponse~
+signIn() Promise~IAuthResponse~
        }
class PasswordService{
            -configService: ConfigService~Record~string, unknown~, false~
            +hash() Promise~string~
+compare() Promise~boolean~
        }
class CreateImageDto{
            
            
        }
class UpdateImageDto{
            
            
        }
class Image{
            +id: number
+image: string
+project: Project
            
        }
class ICreateImage {
            <<interface>>
            +image: string
            
        }
class CreateProjectDto{
            +userId: number
+title: string
+image: string
            
        }
class FindByUserIdDto{
            +userId: number
            
        }
class UpdateProjectDto{
            +userId: number
+title?: string
+image?: string
            
        }
class Project{
            +id: number
+title: string
+user: User
+image: Image
            
        }
class ICreateProject {
            <<interface>>
            +title: string
+userId: number
+image: string
            
        }
class IUpdateProject {
            <<interface>>
            +userId: number
+title?: string
+image?: string
            
        }
class User{
            +id: number
+name: string
+email: string
+password: string
+projects: Project[]
            
        }
class ICreateUser {
            <<interface>>
            +name: string
+email: string
+password: string
            
        }
class IFindUser {
            <<interface>>
            +id?: number
+email?: string
            
        }
class IUser {
            <<interface>>
            +id: number
+name: string
+email: string
+password: string
            
        }