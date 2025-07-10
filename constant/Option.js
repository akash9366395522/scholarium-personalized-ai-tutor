export const PraticeOption = [
    {
        name: 'Quiz',
        image: require('../assets/quizz1.png'),
        icon: require('../assets/quiz.png'),
        path: '/quiz'
    },
    {
        name: 'Flashcards',
        image: require('../assets/flashcard1.png'),
        icon: require('../assets/layers.png'),
        path: '/flashcards'

    },
    {
        name: 'Questions',
        image: require('../assets/notes1.png'),
        icon: require('../assets/qa.png'),
        path: '/questionAnswer'


    }
]

export const imageAssets = {
    '/banner1.png': require('../assets/banner1.png'),
    '/banner2.png': require('../assets/banner2.png'),
    '/banner3.png': require('../assets/banner3.png'),
    '/banner4.png': require('../assets/banner4.png'),
    '/banner5.png': require('../assets/banner5.png'),

};

export const CourseCategory = ["Tech & Coding", "Business & Finance", "Health & Fitness", "Science & Engineering", "Arts & Creativity"]

export const ProfileMenu = [
    {
        name: 'Add Course',
        icon: 'add-outline', //Ionic Icons 
        path: 'CreateCourse'
    },
    {
        name: 'My Course',
        icon: 'book', //Ionic Icons 
        path: 'Home'
    },
    {
        name: 'Course Progress',
        icon: 'analytics-outline', //Ionic Icons 
        path: 'Progress'
    },
    {
        name: 'My Subscription',
        icon: 'shield-checkmark', //Ionic Icons 
        path: 'SubscriptionScreen'
    },
    {
        name: 'Logout',
        icon: 'log-out', //Ionic Icons 
        path: 'SignUp'
    }
]