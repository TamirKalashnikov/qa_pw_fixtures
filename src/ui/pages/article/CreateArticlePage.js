import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.tagsField = page.getByPlaceholder('Enter tags');
  }

  async waitForFormToBePrefilled() {
    await test.step(`Wait for the article form to be pre-filled`, async () => {
      await expect(this.titleField).not.toHaveValue('');
    });
  }

  async addTags(tags) {
    await test.step(`Add tags: ${tags.join(', ')}`, async () => {
      for (const tag of tags) {
        await this.tagsField.fill(tag);
        await this.tagsField.press('Enter');
        await expect(this.tagsField).toHaveValue('');
      }
    });
  }

  async fillTitleField(title) {
    await test.step(`Fill the 'Title' field`, async () => {
      await this.titleField.fill(title);
    });
  }

  async fillDescriptionField(description) {
    await test.step(`Fill the 'Description' field`, async () => {
      await this.descriptionField.fill(description);
    });
  }

  async fillTextField(text) {
    await test.step(`Fill the 'Text' field`, async () => {
      await this.textField.fill(text);
    });
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      const [response] = await Promise.all([
        this.page.waitForResponse(
          (res) =>
            res.url().includes('/api/articles/') &&
            res.request().method() === 'PUT',
        ),
        this.updateArticleButton.click(),
      ]);

      expect(response.ok()).toBeTruthy();

      await this.page.waitForURL((url) => !url.pathname.includes('/editor/'));
      await this.page.reload();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}