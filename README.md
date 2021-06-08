* [Moodle](#moodle)
* [Client](#client)
* [Placeholder](#placeholder)
* [API Reference](#API-reference)

# Moodle

# Client

# Placeholder

# API Reference
## Ping Server
* [Controllers](#controllers)
  * [GuardController](#GuardController)
  * [StudentController](#studentcontroller)
* [Model entities and DTOs](#model-entities-and-dtos)
  * [StudentDTO](#studentdto)
  * [Guard](#guard)
  * [Ping](#ping)
  * [Room](#room)
  * [Session](#session)
  * [Status](#status)
  * [Student](#student)
  * [UsbClient](#usbclient)
* [Integration](#integration)
* [Util](#util)
  * [ValidatorUtil](#validatorutil)


***
## Controllers

<a name="GuardController"></a>

## GuardController
**Kind**: global class

* [GuardController](#GuardController)
    * [new GuardController()](#new_GuardController_new)
    * [.getRooms()](#GuardController+getRooms) ⇒
    * [.getStudents()](#GuardController+getStudents) ⇒
    * [.getStudentById(id)](#GuardController+getStudentById) ⇒
    * [.getActiveStudentsBySessionId(id)](#GuardController+getActiveStudentsBySessionId) ⇒
    * [.getStudentsBySessionId(id)](#GuardController+getStudentsBySessionId) ⇒
    * [.setStatusOfStudentInSession(sessionId, usbId, statusId)](#GuardController+setStatusOfStudentInSession) ⇒
    * [.getUser(username, password)](#GuardController+getUser) ⇒
    * [.getPing()](#GuardController+getPing) ⇒
    * [.getRoomById(roomId)](#GuardController+getRoomById) ⇒
    * [.setRoomGridById(roomId, grid)](#GuardController+setRoomGridById) ⇒
    * [.createSession(guardId, grid, students)](#GuardController+createSession) ⇒
    * [.getSessionByGuardId(guardId)](#GuardController+getSessionByGuardId) ⇒
    * [.addStudentToSession(sessionId, student)](#GuardController+addStudentToSession) ⇒
    * [.RemoveStudentInSession(sessionId, usbId)](#GuardController+RemoveStudentInSession) ⇒

<a name="new_GuardController_new"></a>

### new GuardController()
Creates a new instance of this class and attaches a new Integration instance.
Upon creation the Integration instance attempts to connect to the database.

**Throws**:

- Throws an exception if unable to connect to the database.

<a name="GuardController+getRooms"></a>

### guardController.getRooms() ⇒
Called to retrieve all registered rooms.

**Kind**: instance method of [<code>GuardController</code>](#GuardController)
**Returns**: A list of all registered rooms.
<a name="GuardController+getStudents"></a>

### guardController.getStudents() ⇒
Called to retrieve all registered students.

**Kind**: instance method of [<code>GuardController</code>](#GuardController)
**Returns**: A list of all registered students.
<a name="GuardController+getStudentById"></a>

### guardController.getStudentById(id) ⇒
Called to retrieve a student by its id.

**Kind**: instance method of [<code>GuardController</code>](#GuardController)
**Returns**: The student that matches the provided id.

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | The id of the student. |

<a name="GuardController+getActiveStudentsBySessionId"></a>

### guardController.getActiveStudentsBySessionId(id) ⇒
Called to retrive a list of active students registered at the specified session.

**Kind**: instance method of [<code>GuardController</code>](#GuardController)
**Returns**: A list of active students registered at the specified session.

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | The id of the session from which to retrieve active students. |

<a name="GuardController+getStudentsBySessionId"></a>

### guardController.getStudentsBySessionId(id) ⇒
Called to retrive a list of students registered at the specified session.

**Kind**: instance method of [<code>GuardController</code>](#GuardController)
**Returns**: A list of students registered at the specified session.

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | The id of the session from which to retrieve students. |

<a name="GuardController+setStatusOfStudentInSession"></a>

### guardController.setStatusOfStudentInSession(sessionId, usbId, statusId) ⇒
Called to change the status of a student in a session to the provided status id.

**Kind**: instance method of [<code>GuardController</code>](#GuardController)
**Returns**: The updated Student entity.
**Throws**:

- Throws an exception if unable to update the Student or if data validation fails.


| Param | Type | Description |
| --- | --- | --- |
| sessionId | <code>number</code> | The id of the session. |
| usbId | <code>number</code> | The usb id of the student. |
| statusId | <code>number</code> | The statusId to change to. |

<a name="GuardController+getUser"></a>

### guardController.getUser(username, password) ⇒
Called to retrieve a user as a Guard entity from the database.

**Kind**: instance method of [<code>GuardController</code>](#GuardController)
**Returns**: The found guard entity.
**Throws**:

- Throws an exception if unable to retrieve Guard or if the provided password is incorrect.


| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | The username to find in the database. |
| password | <code>string</code> | The password to compare with |

<a name="GuardController+getPing"></a>

### guardController.getPing() ⇒
Called to retrieve the current randomized ping value.

**Kind**: instance method of [<code>GuardController</code>](#GuardController)
**Returns**: Ping entity containing the current randomized ping value.
<a name="GuardController+getRoomById"></a>

### guardController.getRoomById(roomId) ⇒
Called to retrieve a room entity by roomId.

**Kind**: instance method of [<code>GuardController</code>](#GuardController)
**Returns**: The room that matches the provided roomId.

| Param | Type | Description |
| --- | --- | --- |
| roomId | <code>number</code> | The id of the room to be retrieved. |

<a name="GuardController+setRoomGridById"></a>

### guardController.setRoomGridById(roomId, grid) ⇒
Called to set the seating grid of a room entity.

**Kind**: instance method of [<code>GuardController</code>](#GuardController)
**Returns**: The updated room entity.

| Param | Type | Description |
| --- | --- | --- |
| roomId | <code>number</code> | The id of the room to be modified. |
| grid | <code>Array.&lt;number&gt;</code> | The new grid to be set. |

<a name="GuardController+createSession"></a>

### guardController.createSession(guardId, grid, students) ⇒
Called to create a session with a specified guard, seating grid and group of students.

**Kind**: instance method of [<code>GuardController</code>](#GuardController)
**Returns**: The created session.

| Param | Type | Description |
| --- | --- | --- |
| guardId | <code>number</code> | The id of the guard responsible for the session. |
| grid | <code>Array.&lt;number&gt;</code> | The seating grid for the session. |
| students | <code>Array.&lt;object&gt;</code> | The group of students. |

<a name="GuardController+getSessionByGuardId"></a>

### guardController.getSessionByGuardId(guardId) ⇒
Called to retrieve a session by guard id.

**Kind**: instance method of [<code>GuardController</code>](#GuardController)
**Returns**: The session that matches the provided guard id.

| Param | Type | Description |
| --- | --- | --- |
| guardId | <code>number</code> | The id of the guard. |

<a name="GuardController+addStudentToSession"></a>

### guardController.addStudentToSession(sessionId, student) ⇒
Called to add a student to a specified session.

**Kind**: instance method of [<code>GuardController</code>](#GuardController)
**Returns**: The modified session.

| Param | Type | Description |
| --- | --- | --- |
| sessionId | <code>number</code> | The id of the session. |
| student | <code>object</code> | An object with the usb id and position fields of the student. |

<a name="GuardController+RemoveStudentInSession"></a>

### guardController.RemoveStudentInSession(sessionId, usbId) ⇒
Called to delete a student from a session.

**Kind**: instance method of [<code>GuardController</code>](#GuardController)
**Returns**: The deleted student.

| Param | Type | Description |
| --- | --- | --- |
| sessionId | <code>number</code> | The id of the session. |
| usbId | <code>number</code> | The usb id of the student. |


<a name="StudentController"></a>

## StudentController
**Kind**: global class

* [StudentController](#StudentController)
    * [new StudentController()](#new_StudentController_new)
    * [.ping(id)](#StudentController+ping) ⇒

<a name="new_StudentController_new"></a>

### new StudentController()
Creates a new instance of this class and attaches a new Integration instance.
Upon creation the Integration instance attempts to connect to the database.

**Throws**:

- Throws an exception if unable to connect to the database.

<a name="StudentController+ping"></a>

### studentController.ping(id) ⇒
Called to ping the server and increment the ping value of the specified Student entity.

**Kind**: instance method of [<code>StudentController</code>](#StudentController)
**Returns**: The updated Student entity.

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | The id of the Student entity to modify. |

## Model entities and DTOs

<a name="StudentDTO"></a>

## StudentDTO
**Kind**: global class
<a name="new_StudentDTO_new"></a>

### new StudentDTO(id, usbId, sessionId, statusId, ping, position)
Creates a new instance.


| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | The id of the student. This field is auto-generated and should not be provided. |
| usbId | <code>number</code> | The id of the usb stick used by the student. |
| sessionId | <code>number</code> | The id of the session in which the student is registered. |
| statusId | <code>number</code> | The id of the student's current status. |
| ping | <code>number</code> | A random number used for incrementation. |
| position | <code>Array.&lt;number&gt;</code> | The seating position taken by the student in a grid [row, column]. |

<a name="Guard"></a>

## Guard
A Guard entity representing an exam invigilator.

**Kind**: global class
<a name="Guard.createModel"></a>

### Guard.createModel(sequelize) ⇒
Initializes the Guard model.

**Kind**: static method of [<code>Guard</code>](#Guard)
**Returns**: A sequelize model describing the Guard entity.

| Param | Type | Description |
| --- | --- | --- |
| sequelize | <code>Sequelize</code> | A sequelize connection instance object. |


<a name="Ping"></a>

## Ping
A Ping entity representing the random ping value given to students.

**Kind**: global class
<a name="Ping.createModel"></a>

### Ping.createModel(sequelize) ⇒
Initializes the Ping model.

**Kind**: static method of [<code>Ping</code>](#Ping)
**Returns**: A sequelize model describing the Ping entity.

| Param | Type | Description |
| --- | --- | --- |
| sequelize | <code>Sequelize</code> | A sequelize connection instance object. |


<a name="Room"></a>

## Room
A Room entity representing a room in which exams are taken.

**Kind**: global class
<a name="Room.createModel"></a>

### Room.createModel(sequelize) ⇒
Initializes the Room model.

**Kind**: static method of [<code>Room</code>](#Room)
**Returns**: A sequelize model describing the Room entity.

| Param | Type | Description |
| --- | --- | --- |
| sequelize | <code>Sequelize</code> | A sequelize connection instance object. |


<a name="Session"></a>

## Session
A Session entity representing an exam session.

**Kind**: global class
<a name="Session.createModel"></a>

### Session.createModel(sequelize) ⇒
Initializes the Session model.

**Kind**: static method of [<code>Session</code>](#Session)
**Returns**: A sequelize model describing the Session entity.

| Param | Type | Description |
| --- | --- | --- |
| sequelize | <code>Sequelize</code> | A sequelize connection instance object. |


<a name="Status"></a>

## Status
A Status entity representing the status of a student.

**Kind**: global class
<a name="Status.createModel"></a>

### Status.createModel(sequelize) ⇒
Initializes the Status model.

**Kind**: static method of [<code>Status</code>](#Status)
**Returns**: A sequelize model describing the Status entity.

| Param | Type | Description |
| --- | --- | --- |
| sequelize | <code>Sequelize</code> | A sequelize connection instance object. |


<a name="Student"></a>

## Student
A Student entity representing the student taking the exam.

**Kind**: global class
<a name="Student.createModel"></a>

### Student.createModel(sequelize) ⇒
Initializes the Student model.

**Kind**: static method of [<code>Student</code>](#Student)
**Returns**: A sequelize model describing the Student entity.

| Param | Type | Description |
| --- | --- | --- |
| sequelize | <code>Sequelize</code> | A sequelize connection instance object. |

<a name="UsbClient"></a>

## UsbClient
A UsbClient entity representing the usb flash drive.

**Kind**: global class
<a name="UsbClient.createModel"></a>

### UsbClient.createModel(sequelize) ⇒
Initializes the UsbClient model.

**Kind**: static method of [<code>UsbClient</code>](#UsbClient)
**Returns**: A sequelize model describing the UsbClient entity.

| Param | Type | Description |
| --- | --- | --- |
| sequelize | <code>Sequelize</code> | A sequelize connection instance object. |



<a name="Integration"></a>

## Integration
**Kind**: global class

* [Integration](#Integration)
    * [new Integration()](#new_Integration_new)
    * [.stopPingRandomizer()](#Integration+stopPingRandomizer)
    * [.getRooms()](#Integration+getRooms) ⇒
    * [.getStudents()](#Integration+getStudents) ⇒
    * [.getStudentById(id)](#Integration+getStudentById) ⇒
    * [.getActiveStudentsBySessionId(id)](#Integration+getActiveStudentsBySessionId) ⇒
    * [.getStudentsBySessionId(id)](#Integration+getStudentsBySessionId) ⇒
    * [.getUser(username, password)](#Integration+getUser) ⇒
    * [.setStatusOfStudentInSession(statusId, id)](#Integration+setStatusOfStudentInSession) ⇒
    * [.ping(id)](#Integration+ping) ⇒
    * [.randomizePing()](#Integration+randomizePing) ⇒
    * [.getPing()](#Integration+getPing) ⇒
    * [.getRoomById(roomId)](#Integration+getRoomById) ⇒
    * [.setRoomGridById(roomId, grid)](#Integration+setRoomGridById) ⇒
    * [.createSession(guardId, grid, students)](#Integration+createSession) ⇒
    * [.getSessionByGuardId(guardId)](#Integration+getSessionByGuardId) ⇒
    * [.addStudentToSession(sessionId, usbId)](#Integration+addStudentToSession) ⇒
    * [.RemoveStudentInSession(sessionId, usbId)](#Integration+RemoveStudentInSession) ⇒

<a name="new_Integration_new"></a>

### new Integration()
Creates a new instance of this class and initializes the database connection
using default credentials for a local postgres database.
Initialization creates the model entities and the required database tables
if they are non-existent.

**Throws**:

- Throws an exception if unable to connect to the database.

<a name="Integration+stopPingRandomizer"></a>

### integration.stopPingRandomizer()
Called to stop the automatic randomization of ping values.

**Kind**: instance method of [<code>Integration</code>](#Integration)
<a name="Integration+getRooms"></a>

### integration.getRooms() ⇒
Called to retrieve all registered rooms.

**Kind**: instance method of [<code>Integration</code>](#Integration)
**Returns**: A list of all registered rooms.
<a name="Integration+getStudents"></a>

### integration.getStudents() ⇒
Called to retrieve all registered students.

**Kind**: instance method of [<code>Integration</code>](#Integration)
**Returns**: A list of all registered students.
<a name="Integration+getStudentById"></a>

### integration.getStudentById(id) ⇒
Called to retrieve a student by its id.

**Kind**: instance method of [<code>Integration</code>](#Integration)
**Returns**: The student that matches the provided id.

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | The id of the student. |

<a name="Integration+getActiveStudentsBySessionId"></a>

### integration.getActiveStudentsBySessionId(id) ⇒
Called to retrive a list of active students registered at the specified session.

**Kind**: instance method of [<code>Integration</code>](#Integration)
**Returns**: A list of active students registered at the specified session.

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | The id of the session from which to retrieve active students. |

<a name="Integration+getStudentsBySessionId"></a>

### integration.getStudentsBySessionId(id) ⇒
Called to retrive a list of students registered at the specified session.

**Kind**: instance method of [<code>Integration</code>](#Integration)
**Returns**: A list of students registered at the specified session.

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | The id of the session from which to retrieve students. |

<a name="Integration+getUser"></a>

### integration.getUser(username, password) ⇒
Called to retrieve a user as a Guard entity from the database.

**Kind**: instance method of [<code>Integration</code>](#Integration)
**Returns**: The found guard entity.
**Throws**:

- Throws an exception if unable to retrieve Guard or if the provided password is incorrect.


| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | The username to find in the database. |
| password | <code>string</code> | The password to compare with |

<a name="Integration+setStatusOfStudentInSession"></a>

### integration.setStatusOfStudentInSession(statusId, id) ⇒
Called to change the status of a student entity to the provided status id.

**Kind**: instance method of [<code>Integration</code>](#Integration)
**Returns**: The updated Student entity.
**Throws**:

- Throws an exception if unable to update the Student or if data validation fails.


| Param | Type | Description |
| --- | --- | --- |
| statusId | <code>number</code> | The statusId to change to. |
| id | <code>number</code> | The id of the student entity to modify. |

<a name="Integration+ping"></a>

### integration.ping(id) ⇒
Called to ping the server and increment the ping value of the specified Student entity.

**Kind**: instance method of [<code>Integration</code>](#Integration)
**Returns**: The updated Student entity.

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | The id of the Student entity to modify. |

<a name="Integration+randomizePing"></a>

### integration.randomizePing() ⇒
Called to set a new random ping value to all registered students.

**Kind**: instance method of [<code>Integration</code>](#Integration)
**Returns**: An array containing the number of rows set to a new value.
<a name="Integration+getPing"></a>

### integration.getPing() ⇒
Called to retrieve the current randomized ping value.

**Kind**: instance method of [<code>Integration</code>](#Integration)
**Returns**: Ping entity containing the current randomized ping value.
<a name="Integration+getRoomById"></a>

### integration.getRoomById(roomId) ⇒
Called to retrieve a room entity by roomId.

**Kind**: instance method of [<code>Integration</code>](#Integration)
**Returns**: The room that matches the provided roomId.

| Param | Type | Description |
| --- | --- | --- |
| roomId | <code>number</code> | The id of the room to be retrieved. |

<a name="Integration+setRoomGridById"></a>

### integration.setRoomGridById(roomId, grid) ⇒
Called to set the seating grid of a room entity.

**Kind**: instance method of [<code>Integration</code>](#Integration)
**Returns**: The updated room entity.

| Param | Type | Description |
| --- | --- | --- |
| roomId | <code>number</code> | The id of the room to be modified. |
| grid | <code>Array.&lt;number&gt;</code> | The new grid to be set. |

<a name="Integration+createSession"></a>

### integration.createSession(guardId, grid, students) ⇒
Called to create a session with a specified guard, seating grid and group of students.

**Kind**: instance method of [<code>Integration</code>](#Integration)
**Returns**: The created session.

| Param | Type | Description |
| --- | --- | --- |
| guardId | <code>number</code> | The id of the guard responsible for the session. |
| grid | <code>Array.&lt;number&gt;</code> | The seating grid for the session. |
| students | <code>Array.&lt;object&gt;</code> | The group of students. |

<a name="Integration+getSessionByGuardId"></a>

### integration.getSessionByGuardId(guardId) ⇒
Called to retrieve a session by guard id.

**Kind**: instance method of [<code>Integration</code>](#Integration)
**Returns**: The session that matches the provided guard id.

| Param | Type | Description |
| --- | --- | --- |
| guardId | <code>number</code> | The id of the guard. |

<a name="Integration+addStudentToSession"></a>

### integration.addStudentToSession(sessionId, usbId) ⇒
Called to add a student to a specified session.

**Kind**: instance method of [<code>Integration</code>](#Integration)
**Returns**: The modified session.

| Param | Type | Description |
| --- | --- | --- |
| sessionId | <code>number</code> | The id of the session. |
| usbId | <code>number</code> | The usb id of the student. |

<a name="Integration+RemoveStudentInSession"></a>

### integration.RemoveStudentInSession(sessionId, usbId) ⇒
Called to delete a student from a session.

**Kind**: instance method of [<code>Integration</code>](#Integration)
**Returns**: The deleted student.

| Param | Type | Description |
| --- | --- | --- |
| sessionId | <code>number</code> | The id of the session. |
| usbId | <code>number</code> | The usb id of the student. |

## Util

<a name="ValidatorUtil"></a>

## ValidatorUtil
This utility class is used to validate and sanitize input before use.

**Kind**: global class

* [ValidatorUtil](#ValidatorUtil)
    * [.validateId(id)](#ValidatorUtil+validateId) ⇒
    * [.validateUserLogin(username, password)](#ValidatorUtil+validateUserLogin) ⇒
    * [.validateStudent(student)](#ValidatorUtil+validateStudent) ⇒
    * [.validateGrid(grid)](#ValidatorUtil+validateGrid) ⇒

<a name="ValidatorUtil+validateId"></a>

### validatorUtil.validateId(id) ⇒
Validates the provided id, checking for null or non integer values.

**Kind**: instance method of [<code>ValidatorUtil</code>](#ValidatorUtil)
**Returns**: Returns an object containing the validation errors as Object.error                           the validated id.

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | The user's provided id. |

<a name="ValidatorUtil+validateUserLogin"></a>

### validatorUtil.validateUserLogin(username, password) ⇒
Validates the provided username and password, checking if they are empty.
The username is also sanitized.

**Kind**: instance method of [<code>ValidatorUtil</code>](#ValidatorUtil)
**Returns**: Returns an object containing the validation errors as Object.error                          the validated and sanitized username.

| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | The user's provided username. |
| password | <code>string</code> | The user's provided password. |

<a name="ValidatorUtil+validateStudent"></a>

### validatorUtil.validateStudent(student) ⇒
Validates and sanitizes the ids in the provided StudentDTO instance.

**Kind**: instance method of [<code>ValidatorUtil</code>](#ValidatorUtil)
**Returns**: Returns an object containing the validation errors as Object.error                           the validated and sanitized StudentDTO instance.

| Param | Type | Description |
| --- | --- | --- |
| student | <code>StudentDTO</code> | The StudentDTO instance to be validated and sanitized. |

<a name="ValidatorUtil+validateGrid"></a>

### validatorUtil.validateGrid(grid) ⇒
Called to validate the grid type and values.

**Kind**: instance method of [<code>ValidatorUtil</code>](#ValidatorUtil)
**Returns**: Returns an object containing the validation errors as Object.error                   the validated grid.

| Param | Type | Description |
| --- | --- | --- |
| grid | <code>Array.&lt;number&gt;</code> | The new grid to be set. |


