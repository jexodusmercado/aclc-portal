package service

import (
	"portal/api/repository"
	"portal/models"
)

type QuizContentService struct {
	repo repository.QuizContentRepository
}

func NewQuizContentService(repo repository.QuizContentRepository) QuizContentService {
	return QuizContentService{
		repo: repo,
	}
}

func (u QuizContentService) Find(quiz models.QuizContent) (models.QuizContent, error) {
	return u.repo.Find(quiz)
}

func (u QuizContentService) GetRandomByQuizID(quiz models.QuizContent) (models.QuizContent, error) {
	return u.repo.GetRandomByQuizID(quiz)
}

func (u QuizContentService) Create(quiz models.QuizContentCreation) (models.QuizContent, error) {
	return u.repo.Create(quiz)
}

func (u QuizContentService) Answer(quiz models.UserInputQuizContent) error {
	var answer models.AnsweredBy

	answer.QuizID = quiz.QuizID
	answer.UserID = quiz.UserID

	err := u.repo.AnsweredBy(answer)
	if err != nil {
		return err
	}

	return u.repo.Answer(quiz)
}

func (u QuizContentService) Delete(quizContentID string) error {
	return u.repo.DeleteByID(quizContentID)
}

func (u QuizContentService) Update(quizContent models.QuizContentUpdates) error {
	return u.repo.Update(quizContent)
}