
function Trending() {

    const obj = [
        {
            name: "All",
            title: "abc",
            price: 100,
        },
        {
            name: "Dresses",
            title: "abc",
            price: 100,
        },
        {
            name: "Shoes",
            title: "abc",
            price: 100,
        },
        {
            name: "Pens",
            title: "abc",
            price: 100,
        },
        {
            name: "Brownies",
            title: "abc",
            price: 100,
        },
        {
            name: "Shirts",
            title: "abc",
            price: 100,
        },
        {
            name: "Pants",
            title: "abc",
            price: 100,
        },
        {
            name: "Kurti",
            title: "abc",
            price: 100,
        }
    ];


    return (

        <div className='flex flex-col items-center gap-10'>

            {/* Trending Now */}
            <div>
                <p className='uppercase font-semibold text-2xl'>Trending now</p>
            </div>

            {/* category Products */}
            <div className='w-full flex gap-5 scrollbar-hide overflow-x-auto overflow-y-hidden'>

                {
                    obj.map((product) => (
                        <div
                            key={product.name}
                            className=' flex cursor-pointer flex-col justify-center gap-2 items-center '
                        >
                            <div className='w-[200px] h-[200px] overflow-hidden'>
                                <img className=' bg-contain w-full h-full '
                                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAsJCQcJCQcJCQkJCwkJCQkJCQsJCwsMCwsLDA0QDBEODQ4MEhkSJRodJR0ZHxwpKRYlNzU2GioyPi0pMBk7IRP/2wBDAQcICAsJCxULCxUsHRkdLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCz/wAARCAEEAJUDASIAAhEBAxEB/8QAHAAAAgIDAQEAAAAAAAAAAAAAAAEEBQMGBwII/8QASBAAAgEDAgMFBQQGBwQLAAAAAQIDAAQREiEFMUEGEyJRcWGBkaGxFCMyUkJyksHR8BUzU2JjorIHFnThJCU0NWRzgqOz0vH/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/EAB8RAQEBAQEAAwEAAwAAAAAAAAABEQIhAxIxQRNCYf/aAAwDAQACEQMRAD8A3zO5pZNG2TRQG9GaKKA3r1n215p0DzTz60qBQegT5milToFSyadKgRJpb0zSoDejNFFAUZoooDeiiigXU++gUdaVB6ooooCiimOYzyzvQFMVqvDO091xbii2UVtDb22Lhi2oyzssY28TeEZ64WrrjEk1pw29uI5JBJHDmMl22ZmVc4Bx18qCzEcp5I59FNBBH4iq/rMq/wCo1wziXE+KXEria8uXGc4M0mn4A4qpZ+ZZvUsf40H0PlP7SLP/AJsf/wBqNLH8I1fq4b6V87d7F+dP2hXpbjQQVn0kdVkx9DQfQzJIu7Iw9VI+tea4RBxjjUGDb8Tvk8u6upgPgGxVpB207YQY/wCsnmA/Ru4oZwfe66vnQdjpVz7hPbrjd5d2djJwyzuJrmVIUNu0tu2TuWOS6YABJ25Cug+e9AZoopUDop0UCPM0Cg8zRQOiiigKN98c8HGfPG1FFBq/COzcXAZJuKXnERIYYZjIEgKQxq5GTzaQny268qz8fubni/A7yLgaXlzcPLbopgtmVSitqkVnmAUbYPPPKrLjmRwTjDYOPs2M4ON5EHOo/Y/QeFSkMpzeTdR0jjFBzXtPw2OG24OtpY3ltdxxSpxVbopreY6CsmtXIwd8DAx5dTVdl57Xh/HuE3fEn7q0gmeSV2VpdP3TqvhQE8yOlbV22I/pfiQBGBInLGP6pPKtCm50HduH8f7M8Wma24fdxTzLGZDGbeWM6BgEjvUA6+dT5LSwkGJLS0cH89vC3+pa5N/s8Lf7woqgnXaXQwAfyg118gg4IIPkRQVU3Z/szPnveDcMbPMi1hRv2kAPzqsuOw3ZGcHRaTWzHkbS5mUD0WQsnyrZjRQa3wPsjw7gd7PexXE9w7Q9xB9pWMNArHLkNGACWwBnSNs+dbHTpUBSp0CgdFFFAefvooooCiiigKKKKDn/AGjnnPHbyPvZDGiWqqjMSi5iQkBD4flXSIrSyEKYtrYbAbQRD2dFrmXHzntFxIf4tsn/ALcYrqkY+7XruKDk/aY5u74YXCXE6KAqrhQ5AA0gVpNycE1unaTe74h/xNx/8jVpdzzb1oIqO65KswOeasQfiK7J2Imkl4BbmR3dluLhMuxY4DDAyxrjI5N6117sA2eBEflvZx8QpoNtooooFRT2pUBQKOlMUBRRRQLrRR1NFA6KWadAUUCig5xxnxdo+JD/AMdAvw7sV1hPwL+sPrXL+0tlccMvv6XmDTw3vEe8WK1ikMkUcZRyZGI0+ytxsu0hv7W3urXhcvczBmj7/iHDYJQFYr4o5HDDl1FBoXaL/tV//wATP/ratLuebetbR2lvWgvruGe0eOWRjOAk8E6BZSXXxxEqT571qU0wkyQrD1IoMI5NXWP9njZ4PdL+W+c/tIK5JqxkYO9dk7EcNuLDhCSSyxOL/uryIRBsxqyY0uTsT6UG00UUqB0qKKAoFFFA6KWaKA8/fSp+dKgKKKPXAABJJ5ADck0ASqhmZgqqCWZjhQB1JrVONds7KwLw2gE0wyCScY9vI4+vpzqo7V9pzI0ljYyeBGKOyncsDuT7fLy+ujLHLM4GGd3YKqgFmd2OwAG5J6UEvi/Gb3jEoluTkqoRQpcIFBJGxJ8zvUW3XhnK7tpG5+OOeUH2eEZq/PYztL3EcwtYyWXUYRMgnT2MpwufRjVLNZ3VrIYbmCWGUblJkKN6gHpQQJ0jLfcRuidAZHc/E4qO0Mx6Nj1NWBXFeM0EFI9LDvFYr5b/ADNbdwXtPe8Kjhgh0/ZUyFiZTgAkk4Oc/WtfBp6h5UHZOE9ouHcUUKrhJsDUreHf0z++ruuD2t1PayxyxMVZTkEfQ11bs5xxOIwRxyN96BgZO5I5qf3UGxUqKKAooooCiiigdKn5++lQFa92s4seF8MZI2xcXeYo/ML1b+fL21sNcs7dXhn4x9nDZS1iVAP7x5mg1uNTK5JySSSSdySTzrpvYrsykcMXGbmPM04Y2KsNooTt32D+k/TyH61c/wCF2hvLmztFODdXMFvnqBI4RiPQZNfQVukCJHHEoWONFjjUclRAFUD3UEf7GAvKqrifCbDiETQXcMckYBIL7GLAyXVxuMc85rZjjG9ab264mvDuFfZoWxccTLw5XmtsmDKffsvvNByHiMdnHdXK2byPbLK6wPLgO0YOAxxtvUA1ImbUxqMaBUjTpYoPLEgbeYq34LxKSxuYXDkRsyh9/wAJzs3u/nlVSR0ojOliOh/dQd7s7hbq3hnH6a+LHRhzrPWq9irxrjh5iY5MQHM5JKkof3GtqoCiiigKKKKB+dKn1NKgYxqX1Ga452hgvJ+LcQnS2uXjkmJVxDLpIAA2yK7HVx3Fs25hiO35BRLv8cL7OB4eLcHaVHjC3kRJkUoBswyS21djtr2AAffwb/4sf8an/Y7LIP2eLOc/hpm0s/7CP4UPUaW+gx/Xwcv7WP8AjXKe2vEVv+LzosiNFZRx2kelgVJUanYEbbsT8K621nZHnBH8KhScK4QWYmytySSSdAzmh6+f5AMnf51hOPMfGu/Pwng+/wD0KD9mocnCeEDlZ2/7FD1wzK+Y+Io2HMj4iuzycM4WM4tIB6Jj6VFew4eOVtD+zUPXIsenxFehGfu2AznPIg+zcCupSWtooYpbxEgEgcs+zJrHHHZyIskcUelvZuPYap6rOwU4S4nt3bDyLK0aENlgFQk8sdPOuh1RcKjjW6UqiAiOTcAZ5edX1FKnSp0BRRRQHU0qfU0qB1dqdhVJVyvIelQe6DS6imaDyajNzPqakNUZzufU0GJ+VQ5Klvn61Dk600QpOtQpOtTJDzqHJQRJQSrgc2VgPYSMVURM8N0qDKIxQMmdix8J/iKtZmZEdlXUVGdPUgc8e2oDNBO8MyHDxyRk5wNSEgEY8xz91Gau+FkG5Ug5Bjk5Ve1rXAnLTsTtqkudI8uZxWy1WhRRRQFFFFAdTSp0qAPI+lW8W0cQzyRB8hVQeR9KtY9kQeSqPlWaMua9E1jrGztK5jjJCr/WOOYzvpX2/T37TQSzgEoitJJjOlMbZ5aiSAPefjUB04hIzapooVycLEpkfHtZ8L/kqyCIi6UAAGdh5nmT7ahXU628ckrKzYZUjRcapZHOlEXPUn+PSlER7JjnN1dt54aJR8EjAqHJaSpul3cA8/vBC4+aZ+dSJAq6JL+YF3J0glktYT+VenvJ3qJIyLHJc2pdo0DM8a6ikqqMsYw36XkRzxj0mIiyNfxZ1LHOo5mPwSfsuSP849KwieKbOk4ZdnVgQynGcMDgg+6prOrAMrAqyhlYcipGQRUC5hWXDAlJVGEkXmBzwR1HmPodw/FY2qtnshLK2iXusgOQq5O5IyN8Vnjuy0kkEwCSx51b7EDqCeh6f8tlOoLQyhsaCRkcsHcZ9lXUvqbwfUl3AhO5kuy/63d6tq2WtZ4TIkt/AU/REuoeRMTD9wrZq1FOlRRVBRRRQPqaVPzpUDG5A8yB8akcPnuLqOW4fCQvIyWsWkalijJTW7cyW5+yo29StSW0FvDENioVQeijGT671npKySXH3cjJksZBDCDtqckKPnUiEKq6FJOnOpjzZjuWPqarpZMS2qkY0JJcEL1Zz3aAf5jVhH4UUuUXVkjJVcg+prMJXpjVXfA6rR84WO4clsAiNpInjSUg7YBPzqyZ4wCTJGAOpkTH1qJJg6wQCrZBBAIIOxBBpVQ5lufEveZBDbNFCQNzgEN7vh7ajMZFIdpNMaZZw6pjQviJ1KdgBn+RUkwuvhhkkC8ljIEgHsXV4h8ah3FrJL4Z3lePYmLSqRtg5GsKMn0JqaiFbbWlpsQO4jIB5hSMgH3VjkNSZCAdJKhiCQuRqwNs6c5xURzVVV8Rjl0pcRHeDLOuPxxn8WfTn/8AtYYZRJmNtg6FgB+HI8WVqxbfIOCOoPIjyqLAiCPu9IBidowQACNJ8JB9KJnqZwaFo+IRSB1ZGhmQgDlkagc/zzraK1bgpZOIiM8mjm9xAyK2mtwgoooqqKKKKB+dKn1NFAqkqyaIpWUMwjRUz7dzj5VHrJGjFIwSAFD6iTgDxYHOufaV6iRZLmd5Bq0x26KCdseNzy8802teHSlxNGXkeUxtcsu/ek4CoxPIfhAxjbHrgW5Rrm6SCWN8NAhMbK+GC4IypIqXGFjj7qdZW7uYzLoR3737wyrgqDuDzBxy8jWeU8qFCtgqKxsbQ3iXn2JcIqK0437zUQcDALHA6VHj4nNKtkklkY7y/urmC1gMwKNDActdNJp1CPGCBpycjbfIkNZ3D28muMrPNeNfApJF9y5OAhDgqdvxetVd5acRuZuGzP8A0ik1lJcFprW5sIXmin0hol0Y0jYcgTz3zuLU9jyblOK2kUty0ttam5vLV7a1lm727nhmeJV1wASlcKW0jHPc4XfXOJcM7PWXc8QS2E9j9sSy4jBO9wZLZ32EiF2EgK/pKcgggjGcm9trd+GC3LxXAtIZ+JDL91K0C3zpMHPcMzEKV0seeGBxgEit4zDHxCOaysGM8nE+IWt1fzJvBa29tGsYBf8ADqIUBRkk7k4HKJZs/wCscklnwmfidpw3gymaGztrsdwyqbgSOyYZyCwAxsMkknkOde5L64e7S3gtUkjW7+x3Mhm0vHIsaySuqhSCiZCk53JwPbmZZxfXN8LK41T21va6DcWgVEhZ3ByGJydXyqCtveQ3l1cxRzJHdSrNNAZ7Qq0gGCRJ3ZcA8yAaq+lBe3F3JqSGNbOSFpYZRIxmGXKIJFI05YAsMHYYzzrD308Us6MwBLRtnA/KBn34r3ZWs9pqj8YtgZGija4SQRam1YULCpPqWOK9vGJXuV2ziLST0OnNNMti24OEe7il0gP3cu/uxitjrWOAlu+gU8ws6NnoVBraK3y1BRRRWlFFFFA+poo86KAqs43dmC3uijRiWOEyKZMsqKRkvpHXyqzqguuG39/dTsyoltNcQx5lf8dpHpDFVXO5APPHOufbHe54l9nrOWzhtRPkzT232qUkc5pWEpHuDAe6tiZnDw416TsQo29WOMfT91QrhljWOfl3cneEDpG3hI9w+lTlbIBHLofP21zl9akzxhleYPhVyhktwT1AbVqwMemd9qr7meaOa2REdoyc3DLGWAWRu7TxZ2wfEdjtVjNIExkMQRzHSq57qLxZD7aiRgbDOMnfG9OqrBdXE0MsGlC8bJKHCqS3elkSLDDkMkhvYc/o1Dea6NnbyHJuHW116FA8TsgcqsgIHM8wce6pjXKESEK/hAOMblScA/X4VDkuoQeT5yQfDuDjO+/v51nURpWuFgUsV737sSsi6ggLAO6rjfA9ntxtioZeYxTsuXZTIIGZQC6jkxXAHnjYZx7alSXMY6P16DpzPP8An374C4cEgEDJGGxnI9K1ojoWIk8UjJqAjaVdLsNIzkEA8842rHGcmdvOVlHogCfurJM/do78yo8I82Oyj44qN3Tqkao5DKo1eTHmTimqtuEf94RjzSVx66cH91bPitR4FI54lCh3BiuD6EL5Vt1dePwGKKKK2CiiigfU0U+ppUBioouUkA7kh1jkIZQCrqQCu4bBx7qlVXXLJBKHAwZDkMB1OC2TXH5f4z1cWCI8hQuMqeeeWKlRHu/uW/RB7snqg6e6q23umLmIRylcall7thEDkbFiMelWDBZFUMdwVw3IhumPbWOSV6k7w40ED82arJheePDpq7zIHQqBy2HU8/5xPaUpkTYHk+PAfXy+n0qLKfE3kdwRyI9hqdVtBcXeWOY98AkgbgbZIH8frUWRbhgS3dlgVKHAwPFv8qnyHaoshrOpivkF3uNa4HUYyflWHL6Rq/EeYHT2bVJmdI1Z5GVE/M5wM+Q9tV0jyXGVQPHCdmdgVkkHUKOYHz9Ot0xDvQbmG7CH7uGKVlZSfFOgLAqR0XG3tz5Vh4df/a4yJMCZAC2Ng6/nH7/+dWBVQvdqAF0lAANgCMcq1e1JgkDczE+HHmp2IrpzNjHV+tjceBTJ/TMlvpGRY/aYmGN1ZjG4z7CB8a27etC4ESe0tkVO39G3iMP7pbWB++t+rrzPGpdKnRRWlFFFFAzzNGKOtAoAAkgDmSBWG3mily0UiOuMZQg4OcEHHXbepCkBkJ5BlJ9Aa17gsQsnubdyBJITIVPPvC7zOBjy1fKuPzTxNyxdzTRpjvGwpYAY3dzscKPrWBLiSW8tkJwisXCjocaRn271BuZUa5ZpD4YyEVR5Kf3nJrPAQbqzlG3fOjDPRMEgGpxzk1z6624unwQQeVVE1sgkkMTyQkk57piFJ9q/h+VWrnnVfKfG3qa5dOyC6XoyBdAj+/DET8VUVFkivGHiuXA/wool+ejPzrJfX8NthNnmO5TOyA8i+PPoP5NNLJDP3ssks7OxJVUXCL7AWfl7qvHx/b1jrrPEs28KsXYM8n55WLt7ixJqFcXtrBKIpe8VioYNoyhB8iD7uVQ24gbc7tMSejtrU4GNwTn4V6uDFfQW8yDUEYiVV3Meob6sb9PnWvplym7NjIt3bu6oGIZhldQwCc8s8s1RXMYhvGA/A7yoR5EHUPkflViLaNVbQ55aogeQIOdjWLiFu0q98o8TLG36sijG/sPKumfWsdbYsOzRL8csn224ZONhjOGK71v9c57Iyd5xe1O+RDxCFwehASQD5mujVvlrj2CnilTFabGKKdFAHOeVFPG9FAqoZVC39y2SGVkuEI8wfF9av613iMcv2rhzryluGtGxnfWCRn3D5Vz7sma59zzxAnMkvEpbbOI45pGnbP4Y1fz8zyHr7K2Wzgd5EuZBpVVPcJ1wRjUfdyqBbWlus/ELufuyLi/kaMucII0OhB4ts7MffV3HLG4BR1YEZGDzHsrj/k2ZE54y7Xt+tV0v4m9anv1qvlPib1rn1XZEeGAaiI0yzMxJUEljzJJ3qDPbW8mrKYY48SeE7fL5VPkPOokhrE6sMVcgMT9xbxZwoZ3GNWpuWpiKjmC4Zi7zFXGdJCKXH/rO+PZmrJyN6iSgvgaio66eZ99b+yYgyrNpYsVdsYDxqVBYcsqScfHHpXlpGaC2kTYs6ageWMMGVvftUkxAjDMWHtJ5VW3wubZX0IWtZ2DZG7xSczjUeR5/Gus6lyJfPVr2dgVON96owsscxI8pFjI1Ae0Hf0HnW9VznsreXD8eggaR3SS3u5G7yMDcJ+i3Pyro9duJk9ObLPB7qYFFMVtSop0UB1ooooCq2XGQ2ATG5dMjOGGvBFFFef5/yLFNbXct3fNbyqndWrd3CFDDABA1HJO561tAhjCrgchtRRXX45Mjz/7V5GQSuSRg896hzHxv60UV5vn8rtx+IcpO9Q3JooryOiM5NR260UVqD2iIV1EZOM78qj3ZzDJ4VwoO2Bg+w5oor0T8V67OQwrxeGRVw32e4xjpqXet5Boor2T8ceXoV6ooqtCiiig//9k=" alt={product?.name} />
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <p className='font-bold'>{product.title}</p>
                                <p className=' font-semibold text-[black]/[0.5]'>{product.name}</p>
                                <p className='text-red-950 font-semibold'>$ {product.price}</p>
                            </div>

                        </div>
                    ))
                }

            </div>

        </div >

    );

}

export default Trending;