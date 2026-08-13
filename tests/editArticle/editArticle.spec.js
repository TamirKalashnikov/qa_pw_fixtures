import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.beforeEach(
  async ({
    page,
    user,
    homePage,
    createArticlePage,
    viewArticlePage,
    articleWithoutTags,
  }) => {
    await signUpUser(page, user);

    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(articleWithoutTags.title);
    await createArticlePage.fillDescriptionField(
      articleWithoutTags.description,
    );
    await createArticlePage.fillTextField(articleWithoutTags.text);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  },
);

test('Edit an article without tags', async ({
  viewArticlePage,
  createArticlePage,
  editArticlePage,
  articleWithoutTags,
}) => {
  await viewArticlePage.clickEditArticleLink();
  await createArticlePage.waitForFormToBePrefilled();

  await createArticlePage.fillTitleField(articleWithoutTags.title);
  await createArticlePage.fillDescriptionField(articleWithoutTags.description);
  await createArticlePage.fillTextField(articleWithoutTags.text);
  await createArticlePage.clickUpdateArticleButton();

  await editArticlePage.assertArticleTitle(articleWithoutTags.title);
  await editArticlePage.assertArticleText(articleWithoutTags.text);
});

test('Edit an article with one tag', async ({
  viewArticlePage,
  createArticlePage,
  editArticlePage,
  articleWithOneTag,
}) => {
  await viewArticlePage.clickEditArticleLink();
  await createArticlePage.waitForFormToBePrefilled();

  await createArticlePage.addTags(articleWithOneTag.tags);
  await createArticlePage.fillTitleField(articleWithOneTag.title);
  await createArticlePage.fillDescriptionField(articleWithOneTag.description);
  await createArticlePage.fillTextField(articleWithOneTag.text);
  await createArticlePage.clickUpdateArticleButton();

  await editArticlePage.assertArticleTitle(articleWithOneTag.title);
  await editArticlePage.assertArticleText(articleWithOneTag.text);
});

test('Edit an article with two tags', async ({
  viewArticlePage,
  createArticlePage,
  editArticlePage,
  articleWithTwoTags,
}) => {
  await viewArticlePage.clickEditArticleLink();
  await createArticlePage.waitForFormToBePrefilled();

  await createArticlePage.addTags(articleWithTwoTags.tags);
  await createArticlePage.fillTitleField(articleWithTwoTags.title);
  await createArticlePage.fillDescriptionField(articleWithTwoTags.description);
  await createArticlePage.fillTextField(articleWithTwoTags.text);
  await createArticlePage.clickUpdateArticleButton();

  await editArticlePage.assertArticleTitle(articleWithTwoTags.title);
  await editArticlePage.assertArticleText(articleWithTwoTags.text);
});