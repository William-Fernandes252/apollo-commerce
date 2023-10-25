import faker_commerce  # type: ignore
from faker import Faker

fake = Faker("en_Us")
fake.add_provider(faker_commerce.Provider)
