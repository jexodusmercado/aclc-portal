package service
import (
    "portal/api/repository"
    "portal/models"
)

type CourseService struct {
    repo repository.CourseRepository
}

func NewCourseService(repo repository.CourseRepository) CourseService {
    return CourseService{
        repo: repo,
    }
}

func (u CourseService) Create(course models.CourseCreation) error {
    return u.repo.Create(course)
}

func (u CourseService) Update(course models.Course) error {
    return u.repo.Update(course)
}

func (u CourseService) FindAll(course models.Course, keyword string) (*[]models.Course, int64, error) {
    return u.repo.FindAll(course, keyword)
}

func (u CourseService) Find(course models.Course) (models.Course, error) {
    return u.repo.Find(course)
}
