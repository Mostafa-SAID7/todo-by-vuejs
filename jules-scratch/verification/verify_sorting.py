from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:5173/")

    # Add todos
    page.get_by_placeholder("Add a new todo...").fill("Todo with late due date")
    page.get_by_placeholder("Category").fill("Work")
    page.get_by_role("textbox", name="").nth(2).fill("2024-12-31")
    page.get_by_placeholder("Add a new todo...").press("Enter")

    page.get_by_placeholder("Add a new todo...").fill("Todo with early due date")
    page.get_by_placeholder("Category").fill("Personal")
    page.get_by_role("textbox", name="").nth(2).fill("2024-01-01")
    page.get_by_placeholder("Add a new todo...").press("Enter")

    page.get_by_placeholder("Add a new todo...").fill("Todo without due date")
    page.get_by_placeholder("Category").fill("Misc")
    page.get_by_placeholder("Add a new todo...").press("Enter")

    page.wait_for_timeout(500) # wait for 500ms

    # Sort by due date
    page.get_by_role("combobox").nth(1).select_option("dueDate")

    page.screenshot(path="jules-scratch/verification/verification.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
